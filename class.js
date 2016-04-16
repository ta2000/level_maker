"use strict";

class Tile {
	constructor(properties, x, y) {
		this.image = new Image();
		this.className = "";
		this.imageURL = "/not_found.png";
		this.x = x;
		this.y = y;

		for (var i in properties) {
			this[i] = properties[i];
		}

		this.image.src = this.imageURL;
	}
}
