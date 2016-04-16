var Editor = {
	StartTileSize : 16,
	tileSize : 16,
	mousedown : false,
	canvas : document.createElement("canvas"),
	start : function() {
		Editor.ctx = Editor.canvas.getContext("2d");
		document.body.insertBefore(Editor.canvas, document.body.childNodes[0]);
		Editor.update();
	},
	update : function() {
		Editor.canvas.width = Editor.tileSize*document.getElementById('cWidth').value;
		Editor.canvas.height = Editor.tileSize*document.getElementById('cHeight').value;
		Editor.draw();
	},
	clear : function() {
		Editor.canvas.width = Editor.canvas.width;
	},
	draw : function() {
		Editor.clear();
		for (var i=0; i<level.board.length; i++) {
			if (level.board[i].image==undefined) {
				Editor.ctx.fillStyle = "#FFFFFF";
				Editor.ctx.fillRect(level.board[i].x*Editor.tileSize, level.board[i].y*Editor.tileSize, Editor.tileSize, Editor.tileSize);
			} else {
				Editor.ctx.drawImage(level.board[i].image, level.board[i].x*Editor.tileSize, level.board[i].y*Editor.tileSize, Editor.tileSize, Editor.tileSize);
			}
		};
		Editor.drawGrid();
	},
	drawGrid : function() {
		// Draw grid
		Editor.ctx.beginPath();
		Editor.ctx.strokeStyle = "#CCCCCC";
		for (var i = Editor.tileSize; i < Editor.canvas.width; i+=Editor.tileSize) {
			Editor.ctx.moveTo(i, 0);
			Editor.ctx.lineTo(i, Editor.canvas.height);
			Editor.ctx.stroke();
		};
		for (var i = Editor.tileSize; i < Editor.canvas.height; i+=Editor.tileSize) {
			Editor.ctx.moveTo(0, i);
			Editor.ctx.lineTo(Editor.canvas.width, i);
			Editor.ctx.stroke();
		};
	},
	loadLevel : function(file) {
		level = JSON.parse(file);
		for (var i = 0; i < level.board.length; i++) {
			level.board[i].image = new Image();
			level.board[i].image.src = level.board[i].imageURL;
		}
		document.getElementById('cWidth').value = level.width;
		document.getElementById('cHeight').value = level.height;
		// Have to delay otherwise draw not called
		setInterval(function () {
			Editor.update();
		}, 5);
	},
	mouseTrue : function() {
		Editor.mousedown = true;
	},
	mouseFalse : function() {
		Editor.mousedown = false;
		Editor.draw();
	},
	// Get canvas X/Y
	getPosition : function(e) {
		if (Editor.mousedown) {
		    var x;
		    var y;
		    if (e.pageX || e.pageY) {
				x = e.pageX;
				y = e.pageY;
		    } else {
			x = e.clientX + document.body.scrollLeft +
		        document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop +
		        document.documentElement.scrollTop;
		    }

			// Convert to coordinates relative to the canvas
		    x -= Editor.canvas.offsetLeft;
		    y -= Editor.canvas.offsetTop;

			if (x>=0 && y>=0 && x<=Editor.canvas.width && y<=Editor.canvas.height) {

				x = Math.round((Math.floor(x/Editor.tileSize)*Editor.tileSize)/Editor.tileSize);
				y = Math.round((Math.floor(y/Editor.tileSize)*Editor.tileSize)/Editor.tileSize);

				// If tile already exists in location, delete it
				var overlap = false;
				for (var i = 0; i < level.board.length; i++) {

					if ( (level.board[i].x == x) && (level.board[i].y == y) ) {
						overlap = true;
					}
				}
				if (overlap) {
					Editor.removeElement(x, y);
				}

				// Create new tile if erase not selected
				if (selectedTile!=0) {
					level.board.push(new Tile( select.children[selectedTile].dataValue, x, y ));
				} else {
					Editor.removeElement(x,y);
					Editor.clear();
				}
			}
			Editor.draw();
		}
	},
	removeElement : function(x, y) {
		var temp = [];
		for (var i = 0; i < level.board.length; i++) {
			if ( (level.board[i].y==y) && (level.board[i].x==x) ) {
				console.log("Removed index " + i);
			} else {
				temp.push(level.board[i]);
			}
		}
		level.board = temp;
	}
}
