import { BaseObject } from "./gameObject.js";

export class Landscape extends BaseObject {

	#tiles = new Image();
	#imageLoaded = false;
	#tileWidth = 0;
	#tileHeight = 0;
	#tilesInRow = 0;

	#xCount = 0;
	#yCount = 0;

	#cells;

	constructor(name, tiles, tileWidth, tileHeight, cells) {
		super({ name: name });
		this.#tiles = tiles;
		this.#cells = cells;
		this.#tileWidth = tileWidth;
		this.#tileHeight = tileHeight;
		this.#tilesInRow = this.#tiles.width / this.#tileWidth;

	}

	tilePos(cell) {
		return {
			x: cell % this.#tilesInRow,
			y: Math.floor(cell / this.#tilesInRow)
		}
	}

	update(drivers) {
		const rndr = drivers.render;
		for (let r = 0; r < this.#cells.length; r++) {
			const row = this.#cells[r];
			for (let c = 0; c < row.length; c++) {
				const cell = row[c];
				const pos = this.tilePos(cell);
				rndr.tile({
					image: this.#tiles,
					tileX: pos.x,
					tileY: pos.y,
					x: c * this.#tileWidth,
					y: r * this.#tileHeight,
					width: this.#tileWidth,
					height: this.#tileHeight,
					tileWidth: this.#tileWidth,
					tileHeight: this.#tileHeight,
				});
			}
		}
	}
}