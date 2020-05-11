import { Scene } from "./scene.js";
import { Pacman } from "../gameObjects/pacman.js";
import { WalkMan } from "../gameObjects/walkMan.js";
import { Pers } from "../gameObjects/pers.js";
import { Landscape } from "../gameObjects/gameMap.js";
import { Animation } from "../animations/animation.js";
import { Frame } from "../animations/frame.js";

export class PacScene extends Scene {

	constructor(name, drivers, tiles) {

		// const lendCells = [30, 31, 46, 47];

		const landscape = new Landscape({
			name: 'GameMap',
			tiles: tiles,
			tileWidth: 32,
			tileHeight: 32,
			cells: [
				[31, 30, 30, 30, 31, 30, 30, 30, 30, 30, 31, 30, 31, 30, 30, 30],
				[30, 31, 31, 30, 31, 30, 30, 30, 30, 31, 30, 30, 30, 30, 30, 31],
				[30, 30, 31, 30, 31, 30, 30, 30, 30, 30, 31, 30, 31, 30, 30, 30],
				[31, 30, 30, 30, 30, 30, 30, 30, 31, 30, 30, 30, 31, 30, 30, 30],
				[30, 30, 30, 30, 30, 30, 30, 30, 30, 31, 30, 30, 30, 30, 30, 31],
				[30, 31, 31, 30, 31, 30, 30, 30, 30, 30, 31, 30, 30, 30, 30, 30],
				[31, 30, 30, 30, 31, 30, 30, 30, 31, 30, 30, 30, 31, 30, 30, 31],
				[30, 30, 30, 30, 30, 30, 30, 30, 31, 30, 31, 31, 30, 30, 31, 30],
				[30, 30, 30, 30, 30, 30, 30, 30, 31, 30, 30, 31, 30, 30, 31, 30],
				[31, 30, 30, 30, 31, 30, 30, 31, 30, 30, 30, 30, 31, 31, 30, 30],
				[30, 30, 30, 30, 30, 30, 30, 31, 31, 30, 30, 30, 30, 30, 31, 30],
				[30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 31, 30],
				// [30, 30, 30, 30, 30, 30, 30, 30, 31, 30, 30, 30, 30, 30, 31, 30],
				// [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 31, 30],
			]

		});
		const order = [0, 1, 2];
		const pers = new Personage('Pers', 10, 100, tiles, {
			moveRight: new Animation([new Frame(0, 8, 32, 32, 100), new Frame(1, 8, 32, 32, 100), new Frame(1, 8, 32, 32, 100)], order, true),

		}

		);
		// const pac = new Pacman('Pacman', 100, 100, '#00F0FF', 50);

		// const tiles = new Image();
		// tiles.addEventListener("load", function () {
		// 	walcMan = new Pers('Pers', 10, 100, tiles);
		// }, false);
		// tiles.src = 'tiles.png';

		super({
			name: name,
			drivers: drivers,
		}, [landscape, pers]
		);
	}
}