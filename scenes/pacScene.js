import { Scene } from "./scene.js";
import { Landscape } from "../gameObjects/gameMap.js";
import { WhiteWolker } from "../gameObjects/whiteWolker.js";
import { WalkMan } from "../gameObjects/walkMan.js";

export class PacScene extends Scene {

	constructor(name, drivers, tiles) {

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

		const pers = new WalkMan('Pers', 10, 100, tiles);

		const whiteWolkers = [];
		for (let i = 0; i < 20; i++) {
			const x = Math.trunc(Math.random()*400);
			const y = Math.trunc(Math.random()*300);
			whiteWolkers.push(new WhiteWolker(`WhiteWolker${i}`, x,y, tiles));
		}
		super({
			name: name,
			drivers: drivers,
		}, [landscape, pers]
		);
	}
}