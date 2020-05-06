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
		const r = drivers.render;
		for (let r = 0; r < this.#cells.length; r++) {
			const row = this.#cells[r];
			for (let c = 0; c < row.length; c++) {
				const cell = row[c];
				r.tile({
					image: this.#tiles,
					x:,
					y:,
					width: this.#tileWidth,
					height: this.#tileHeight,
				});
			}

		}
	}