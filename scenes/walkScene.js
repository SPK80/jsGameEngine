import { Scene } from "./scene.js";
import { walkMan } from "../gameObjects/walkMan.js";

export class WalkScene extends Scene {

	constructor(id, settings) {
		super(id, settings);
		const walkman = new walkMan(100, 100);
		super.addControlled(walkman);
		super.addDisplayed(walkman);
		super.addSounding(walkman);

		// super.#controlled.push(pacman);
		// super.#displayed.push(pacman);
		// super.#sounding.push(pacman);
	}
}