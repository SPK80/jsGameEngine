import { BodyGameObject } from "./gameObject.js";
import { throwIfUndefined } from "../tools/classUtils.js";

export class Landscape extends BodyGameObject {

	#tiles = null;
	#tileWidth = 0;
	#tileHeight = 0;
	#tilesInRow = 0;

	#cells;

	constructor(params) {
		super({
			name: params.name,
			x: 0,
			y: 0,
			z: 0
		});
		throwIfUndefined(params.tiles, 'tiles');
		this.#tiles = params.tiles;
		throwIfUndefined(params.cells, 'cells');
		this.#cells = params.cells;
		this.#tileWidth = params.tileWidth;
		throwIfUndefined(params.tileWidth, 'tileWidth');
		this.#tileHeight = params.tileHeight;
		throwIfUndefined(params.tileHeight, 'tileHeight');

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