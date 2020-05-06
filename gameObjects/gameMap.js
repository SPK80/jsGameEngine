import { BaseObject } from "./gameObject.js";

export class GameMap extends BaseObject {

	#tiles = new Image();
	#imageLoaded = false;
	#tileWidth = 0;
	#tileHeight = 0;

	#xCount = 0;
	#yCount = 0;

	#cells = [[]];

	constructor(name, tiles) {
		super({ name: name });
		this.#tiles = tiles;
	}
	update(drivers) {
		this.#cells.forEach(row => {

		});
	}
}