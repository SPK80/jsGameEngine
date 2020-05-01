import { Scene } from "./scene.js";
import { Pacman } from "../gameObjects/pacman.js";
import { walkMan } from "../gameObjects/walkMan.js";

export class PacScene extends Scene {

	constructor(name, abilities) {
		super({
			name: name,
			abilities: abilities,
		},
			[new Pacman('Pacman', 100, 100, '#00F0FF', 50,
				{
					render: abilities.render,
					input: abilities.input
				})]
		);
		// const pacman = ;
		// super.add(pacman);
		// const walcMan = new walkMan(10, 100, '#00F0FF');
		// super.add(walcMan);
	}

}