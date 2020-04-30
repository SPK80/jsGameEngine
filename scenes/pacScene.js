import { Scene } from "./scene.js";
import { Pacman } from "../gameObjects/pacman.js";
import { walkMan } from "../gameObjects/walkMan.js";

export class PacScene extends Scene {

	constructor(name, abilities) {
		super(name, abilities);
	}

	init(params) {
		super.init(params);

		const pacman = new Pacman(100, 100, '#00F0FF', 50);
		super.add(pacman);

		const walcMan = new walkMan(10, 100, '#00F0FF');
		super.add(walcMan);
	}
}