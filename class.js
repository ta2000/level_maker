"use strict";

class Tile {
	constructor(createClassOptions, x, y) {
		this.image = new Image();
		this.className = "";
		this.imageURL = "/not_found.png";
		this.x = x;
		this.y = y;

		for (var variable in createClassOptions) {
			if (createClassOptions.hasOwnProperty(variable)) {
				this[variable] = createClassOptions[variable];
			}
		}

		this.image.src = this.imageURL;
	}
}
