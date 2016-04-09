var Editor = {
	StartTileSize : 16,
	tileSize : 16,
	mousedown : false,
	canvas : document.createElement("canvas"),
	start : function() {
		Editor.canvas.width = Editor.tileSize*document.getElementById('cWidth').value;
		Editor.canvas.height = Editor.tileSize*document.getElementById('cHeight').value;
		Editor.ctx = Editor.canvas.getContext("2d");
		document.body.insertBefore(Editor.canvas, document.body.childNodes[0]);
		Editor.drawGrid();
		Editor.draw();
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
		for (var i=0; i<obj.board.length; i++) {
			if (images[obj.board[i].imgIndex]=="ERASE") {
				Editor.ctx.fillStyle = "#FFFFFF";
				Editor.ctx.fillRect(obj.board[i].x*Editor.tileSize, obj.board[i].y*Editor.tileSize, Editor.tileSize, Editor.tileSize);
			} else {
				Editor.ctx.drawImage(images[obj.board[i].imgIndex], obj.board[i].x*Editor.tileSize, obj.board[i].y*Editor.tileSize, Editor.tileSize, Editor.tileSize);
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
		obj = JSON.parse(file);
		document.getElementById('cWidth').value = obj.width;
		document.getElementById('cHeight').value = obj.height;
		Editor.start();
	},
	mouseTrue : function() {
		Editor.mousedown = true;
	},
	mouseFalse : function() {
		Editor.mousedown = false;
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

				var overlap = false;
				for (var i = 0; i < obj.board.length; i++) {

					if ( (obj.board[i].x == x) && (obj.board[i].y == y) ) {
						overlap = true;
					}
				}
				if (overlap) {
					Editor.removeElement(x, y);
				}

				if (selectedTile!=0) {
					obj.board.push(new Tile( selectedTile, document.getElementById('select').children[selectedTile].innerHTML, x, y ));
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
		for (var i = 0; i < obj.board.length; i++) {
			if ( (obj.board[i].y==y) && (obj.board[i].x==x) ) {
				console.log("Removed index " + i);
			} else {
				temp.push(obj.board[i]);
			}
		}
		obj.board = temp;
	}
}
