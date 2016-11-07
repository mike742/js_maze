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
	//this.x_max = 3;
	//this.y_max = 3;
	
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
	
	this.maze[this.y_start][this.x_start] = this.active;

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
			//x =  getRandom(0, potent_nodes.length - 1); 
			x =  getRandom(0, getRandom(0, potent_nodes.length - 1)); 

			this.maze[ potent_nodes[x].y ][potent_nodes[x].x ] = this.active;

			// checking next step
			if(current_node.x == potent_nodes[x].x) {

				current_node.y = current_node.y > potent_nodes[x].y ? potent_nodes[x].y - 1 : potent_nodes[x].y + 1; 

			} else if(current_node.y == potent_nodes[x].y) {

				current_node.x = current_node.x > potent_nodes[x].x ? potent_nodes[x].x - 1 : potent_nodes[x].x + 1; 
			}

			this.maze[current_node.y][current_node.x] = this.active;
			
		} else {
			
			this.maze[current_node.y][current_node.x] = this.back; 
			// return to the previuos node or to the start
			// N
			if(this.maze[current_node.y - 1][current_node.x] == this.active) {

				current_node.y -= 1;
				//this.maze[current_node.y - 1][current_node.x] = this.back; 
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

			this.maze[i][j] = this.maze[i][j] == this.back ? this.space : this.maze[i][j];
		}
	}
} 

Maze.prototype.prim = function () {

	var current_node = { y: this.y_max, x: this.x_max };
	var nodes = new Array();
	var x = 0, y = 0, n = 0, t = 0;		
	
	function getRandom(min, max) {
	  
		min = Math.ceil(min);
	  	max = Math.floor(max);
	  	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	do {
		this.maze[current_node.y][current_node.x] = this.back;
	
		// check for four directions
		// N
		if(current_node.y - 1 > this.y_min 
		   && this.maze[current_node.y - 2][current_node.x] == this.space) {

			nodes.push( {y: current_node.y - 2, x: current_node.x} );
			this.maze[current_node.y - 2][current_node.x] = this.active;
		}
		// E
		if(current_node.x + 1 < this.x_max 
		   && this.maze[current_node.y][current_node.x + 2] == this.space) {

			nodes.push( {y: current_node.y, x: current_node.x + 2} );
			this.maze[current_node.y][current_node.x + 2] = this.active;
		}
		// S
		if(current_node.y + 1 < this.y_max 
		   && this.maze[current_node.y + 2][current_node.x] == this.space) {

			nodes.push( {y: current_node.y + 2, x: current_node.x} );
			this.maze[current_node.y + 2][current_node.x] = this.active;
		}
		// W
		if(current_node.x - 1 > this.x_min 
		   && this.maze[current_node.y][current_node.x - 2] == this.space) {

			nodes.push( {y: current_node.y, x: current_node.x - 2} );
			this.maze[current_node.y][current_node.x - 2] = this.active;
		}
	
		
		if(nodes.length > 0) {
			
			n = getRandom(0, nodes.length - 1); 
			x = nodes[n].x;
			y = nodes[n].y;

			this.maze[current_node.y][current_node.x] = this.back;

			// digging the wall
			// N
			if(y - 1 > this.y_min 
			   && this.maze[y - 2][x] === this.back
			   && this.maze[y - 1][x] === this.brick
			  ) {

				this.maze[y - 1][x] = this.back;
			}
			// E
			else if(x + 1 < this.x_max 
			   && this.maze[y][x + 1] === this.brick
			   && this.maze[y][x + 2] === this.back
			) {
				
				this.maze[y][x + 1] = this.back;
			}
			
			// S
			else if(	y + 1 < this.y_max 
			   && this.maze[y + 1][x] === this.brick
			   && this.maze[y + 2][x] === this.back
			) {

				this.maze[y + 1][x] = this.back;
			}
			// W
			else if(x - 1 > this.x_min 
			   && this.maze[y][x - 1] === this.brick
			   && this.maze[y][x - 2] === this.back
			) {

				this.maze[y][x - 1] = this.back;
			}
			current_node = nodes[n];
			this.maze[current_node.y][current_node.x] = this.back;
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

var cols = 97, rows = 35;
//cols = 57, rows = 31;
//cols = 7, rows = 7;

var maze = new Maze(cols, rows);

// maze.rbt();
maze.prim();
maze.print();

