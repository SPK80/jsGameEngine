import { Scene } from "./scene.js";
import { Pacman } from "../gameObjects/pacman.js";
import { WalkMan } from "../gameObjects/walkMan.js";
import { Pers } from "../gameObjects/pers.js";
import { GameMap } from "../gameObjects/gameMap.js";

export class PacScene extends Scene {

	constructor(name, drivers, tiles) {

		const map = new GameMap('GameMap', tiles);

		const walcMan = new Pers('Pers', 10, 100, tiles);
		const pac = new Pacman('Pacman', 100, 100, '#00F0FF', 50);

		// const tiles = new Image();
		// tiles.addEventListener("load", function () {
		// 	walcMan = new Pers('Pers', 10, 100, tiles);
		// }, false);
		// tiles.src = 'tiles.png';

		super({
			name: name,
			drivers: drivers,
		}, [pac, walcMan]
		);
	}
}