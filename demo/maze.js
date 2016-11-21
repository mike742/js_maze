/* base class Maze */
function Maze (c, r) {
	
	//  fields
	this.brick = 9608; //9619; 
	this.back = 9830;
	this.space = 9617;
	this.active = 9726; //9724; //9630;
	this.cols = c, this.rows = r;
	this.maze = new Array();
	
	this.x_min = 1;
	this.y_min = 1;
	this.x_max = this.cols - 2;
	this.y_max = this.rows - 2;
	this.x_start = this.cols - 2;
 	this.y_start = this.rows - 2;	
	this.x_end = 1;
	this.y_end = 1;
	
	/* c-tor */
	for (i = 0; i < this.rows; ++i) {

		this.maze[i] = new Array();
	
		for (j = 0; j < this.cols; ++j) {

			if (i % 2 == 0) {

				this.maze[i][j] = this.brick;
			}
			else if (j % 2 == 0) {

				this.maze[i][j] = this.brick;
			}
			else {

				this.maze[i][j] = this.space;
			}
		}
	}
}

/* Public methods */
Maze.prototype.print = function() {

	for (i = 0; i < rows; ++i) {
		for (j = 0; j < cols; ++j) {

			document.write (String.fromCharCode(this.maze[i][j]));
		}
		document.write ('<br />');
	}
};

Maze.prototype.print_div = function () {

	for (i = 0; i < rows; ++i) {
		
		document.write ("<div class='brick' id='first' name='" + i + "_" + j + "'></div>");
		
		for (j = 1; j < cols; ++j) {

			switch (this.maze[i][j]) {
			
				case 9608: // brick;

					document.write ("<div class='brick' name='" + i + "_" + j + "'></div>");
					break;
					
				case 9617: // space;
					
					document.write ("<div class='brick' id='space' name='" + i + "_" + j + "'></div>");
					break;
			}
		}
	}	
}

Maze.prototype.clear = function() {

	for (i = 0; i < this.rows; ++i) {

		for (j = 0; j < this.cols; ++j) {

			if (i % 2 == 0) {

				this.maze[i][j] = this.brick;
			}
			else if (j % 2 == 0) {

				this.maze[i][j] = this.brick;
			}
			else {

				this.maze[i][j] = this.space;
			}
		}
	}
}

Maze.prototype.rbt = function () {
	
	var current_node = { x: this.x_max, y: this.y_max };
	var potent_nodes = new Array(), is_run = true;
	var x = 0, y = 0;		
	var t = dt = 100;
	var name = "";
	var el = 0; 

	this.maze[this.y_start][this.x_start] = this.active;
	
	// change div's id-attr 
	name = this.y_start + "_" + this.x_start;
	el = $("div[name = " + name + "]");
	
	el.delay(t += dt).queue(function() {

		 $(this).attr('id', "active");
		 $(this).dequeue();
	});
	
	function getRandom(min, max) {
	  
		min = Math.ceil(min);
	  	max = Math.floor(max);
	  	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function delAllNodes() {
	
		while (potent_nodes.length) { potent_nodes.pop(); }
	}

	// main cycle
	do {
		delAllNodes();

		// check for four directions
		// N
		if(current_node.y - 1 > this.y_min 
		   && this.maze[current_node.y - 2][current_node.x] == this.space) {

			potent_nodes.push( {y: current_node.y - 1, x: current_node.x} );
		}
		// E
		if(current_node.x + 1 < this.x_max
		  && this.maze[current_node.y][current_node.x + 2] == this.space) {

			potent_nodes.push( {y: current_node.y, x: current_node.x + 1} );
		}
		// S
		if(current_node.y + 1 < this.y_max
		  && this.maze[current_node.y + 2][current_node.x] == this.space) {

			potent_nodes.push( {y: current_node.y + 1, x: current_node.x} );
		}
		// W
		if(current_node.x - 1 > this.x_min
		  && this.maze[current_node.y][current_node.x - 2] == this.space) {

			potent_nodes.push( {y: current_node.y, x: current_node.x - 1} );
		}

		if(potent_nodes.length > 0) {
		
			// check potential nodes
			x =  getRandom(0, getRandom(0, potent_nodes.length - 1)); 

			this.maze[ potent_nodes[x].y ][potent_nodes[x].x ] = this.active;

			// change div's id-attr 
			name = potent_nodes[x].y + "_" + potent_nodes[x].x;
			el = $("div[name = " + name + "]");

			el.delay(t += dt).queue(function() {

				 $(this).attr('id', "back");
			});

			// checking next step
			if(current_node.x == potent_nodes[x].x) {

				current_node.y = current_node.y > potent_nodes[x].y ? potent_nodes[x].y - 1 : potent_nodes[x].y + 1; 

			} else if(current_node.y == potent_nodes[x].y) {

				current_node.x = current_node.x > potent_nodes[x].x ? potent_nodes[x].x - 1 : potent_nodes[x].x + 1; 
			}

			this.maze[current_node.y][current_node.x] = this.active;
			
			name = current_node.y + "_" + current_node.x;
			el = $("div[name = " + name + "]");

			el.delay(t += dt).queue(function() {

				 $(this).attr('id', "back");
			});
			
		} else {
			
			this.maze[current_node.y][current_node.x] = this.back; 
			
			name = current_node.y + "_" + current_node.x;
			el = $("div[name = " + name + "]");

			el.delay(t += dt).queue(function() {

				 $(this).attr('id', "back");
				 $(this).dequeue();
			});
			
			// return to the previuos node or to the start
			// N
			if(this.maze[current_node.y - 1][current_node.x] == this.active) {

				current_node.y -= 1;
			}
			// E
			else if(this.maze[current_node.y][current_node.x + 1] == this.active) {

				current_node.x += 1;
			}
			// S
			else if(this.maze[current_node.y + 1][current_node.x] == this.active) {

				current_node.y += 1;
			}
			// W
			else if(this.maze[current_node.y][current_node.x - 1] == this.active) {

				current_node.x -= 1;
			}

			if (current_node.x == this.x_start && current_node.y == this.y_start) {
				is_run = false;
			}
		}
	} while ( is_run || ++y < 100);
	
	// replace this.back
	for (i = 0; i < this.rows; ++i) {

		for (j = 0; j < this.cols; ++j) {

			if(this.maze[i][j] == this.active) {
			
				name = i + "_" + j;
				el = $("div[name = " + name + "]");

				el.delay(t += dt).queue(function() {

					 $(this).attr('id', "space");
					 $(this).dequeue();
				});
			}
			this.maze[i][j] = this.maze[i][j] == this.back ? this.space : this.maze[i][j];
			
		}
	}
} 

Maze.prototype.prim = function () {

	var current_node = { y: this.y_max, x: this.x_max };
	var p_nodes = new Array();
	var nodes = new Array();
	var x = 0, y = 0, n = 0, t = 0;		
	var time = dt = 100;
	var name = "";
	var el = 0; 	
	function getRandom(min, max) {
	  
		min = Math.ceil(min);
	  	max = Math.floor(max);
	  	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	do {
		this.maze[current_node.y][current_node.x] = this.back;
	
		name = current_node.y + "_" + current_node.x;
		el = $("div[name = " + name + "]");

		el.delay(time += dt).queue(function() {

			 $(this).attr('id', "back");
		});
		
		//return;
		// check for four directions
		// N
		if(current_node.y - 1 > this.y_min 
		   && this.maze[current_node.y - 2][current_node.x] == this.space) {

			nodes.push( {y: current_node.y - 2, x: current_node.x} );
			this.maze[current_node.y - 2][current_node.x] = this.active;
			
			name = (current_node.y - 2) + "_" + current_node.x;
			el = $("div[name = " + name + "]");

			el.delay(time += dt).queue(function() {

				 $(this).attr('id', "active");
				 $(this).dequeue();
			});
		}
		// E
		if(current_node.x + 1 < this.x_max 
		   && this.maze[current_node.y][current_node.x + 2] == this.space) {

			nodes.push( {y: current_node.y, x: current_node.x + 2} );
			this.maze[current_node.y][current_node.x + 2] = this.active;

			name = current_node.y + "_" + (current_node.x + 2);
			el = $("div[name = " + name + "]");

			el.delay(time += dt).queue(function() {

				 $(this).attr('id', "active");
				 $(this).dequeue();
			});
		}
		// S
		if(current_node.y + 1 < this.y_max 
		   && this.maze[current_node.y + 2][current_node.x] == this.space) {

			nodes.push( {y: current_node.y + 2, x: current_node.x} );
			this.maze[current_node.y + 2][current_node.x] = this.active;

			name = (current_node.y + 2) + "_" + current_node.x;
			el = $("div[name = " + name + "]");

			el.delay(time += dt).queue(function() {

				 $(this).attr('id', "active");
				 $(this).dequeue();
			});
		}
		// W
		if(current_node.x - 1 > this.x_min 
		   && this.maze[current_node.y][current_node.x - 2] == this.space) {

			nodes.push( {y: current_node.y, x: current_node.x - 2} );
			this.maze[current_node.y][current_node.x - 2] = this.active;

			name = current_node.y + "_" + (current_node.x - 2);
			el = $("div[name = " + name + "]");

			el.delay(time += dt).queue(function() {

				 $(this).attr('id', "active");
				 $(this).dequeue();
			});
		}
	
		
		if(nodes.length > 0) {
			
			n = getRandom(0, nodes.length - 1); 
			x = nodes[n].x;
			y = nodes[n].y;

			this.maze[current_node.y][current_node.x] = this.back;

			name = current_node.y + "_" + current_node.x;
			el = $("div[name = " + name + "]");

			el.delay(time += dt).queue(function() {

				 $(this).attr('id', "back");
				 $(this).dequeue();
			});

			// digging the wall
			
			// p_nodes count
			if(y - 1 > this.y_min 
			   && this.maze[y - 2][x] === this.back
			   && this.maze[y - 1][x] === this.brick
			  ) {

				p_nodes.push(1);
			}
			// E
			else if(x + 1 < this.x_max 
			   && this.maze[y][x + 1] === this.brick
			   && this.maze[y][x + 2] === this.back
			) {
				
				p_nodes.push(2);
			}
			
			// S
			else if(	y + 1 < this.y_max 
			   && this.maze[y + 1][x] === this.brick
			   && this.maze[y + 2][x] === this.back
			) {

				p_nodes.push(3);
			}
			// W
			else if(x - 1 > this.x_min 
			   && this.maze[y][x - 1] === this.brick
			   && this.maze[y][x - 2] === this.back
			) {

				p_nodes.push(4);
			}

			var rn = p_nodes[getRandom(0, p_nodes.length - 1)];
			while (p_nodes.length) { p_nodes.pop(); }
			
			switch(rn) {
				case 1:
					this.maze[y - 1][x] = this.back;

					name = (y - 1) + "_" + x;
					el = $("div[name = " + name + "]");

					el.delay(time += dt).queue(function() {

						 $(this).attr('id', "back");
						 $(this).dequeue();
					});

					break;
				case 2:
					this.maze[y][x + 1] = this.back;
					
					name = (y) + "_" + (x + 1);
					el = $("div[name = " + name + "]");

					el.delay(time += dt).queue(function() {

						 $(this).attr('id', "back");
						 $(this).dequeue();
					});

					break;

				case 3:
					this.maze[y + 1][x] = this.back;
					name = (y + 1) + "_" + x;
					el = $("div[name = " + name + "]");

					el.delay(time += dt).queue(function() {

						 $(this).attr('id', "back");
						 $(this).dequeue();
					});
	
					break;
				case 4:
					this.maze[y][x - 1] = this.back;
					
					name = (y - 1) + "_" + (x - 1);
					el = $("div[name = " + name + "]");

					el.delay(time += dt).queue(function() {

						 $(this).attr('id', "back");
						 $(this).dequeue();
					});

				break;
			}
			
			current_node = nodes[n];
			this.maze[current_node.y][current_node.x] = this.back;
			
			name = current_node.y + "_" + current_node.x;
			el = $("div[name = " + name + "]");

			el.delay(time += dt).queue(function() {

				 $(this).attr('id', "back");
				 $(this).dequeue();
			});

			nodes.splice(n, 1);
		}
	} while(nodes.length > 0);

	// replace this.back
	for (i = 0; i < this.rows; ++i) {

		for (j = 0; j < this.cols; ++j) {

			this.maze[i][j] = this.maze[i][j] == this.back ? this.space : this.maze[i][j];
		}
	}
}


// main
cols = 9, rows = 7;

var maze = new Maze(cols, rows);
maze.print_div();
//maze.rbt();
maze.prim();

