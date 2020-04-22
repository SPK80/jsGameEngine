import { Scene } from "./scene.js";
import { Pacman } from "../gameObjects/pacman.js";

export class PacScene extends Scene {

	constructor(id, settings) {
		super(id, settings);
		const pacman = new Pacman(100, 100, '#00F0FF');
		super.addControlled(pacman);
		super.addDisplayed(pacman);
		super.addSounding(pacman);

		// super.#controlled.push(pacman);
		// super.#displayed.push(pacman);
		// super.#sounding.push(pacman);
	}
}