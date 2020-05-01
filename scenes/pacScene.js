import { Scene } from "./scene.js";
import { Pacman } from "../gameObjects/pacman.js";
import { WalkMan } from "../gameObjects/walkMan.js";

export class PacScene extends Scene {

	constructor(name, abilities) {

		const pac = new Pacman('Pacman', 100, 100, '#00F0FF', 50, {
			render: abilities.render,
			input: abilities.input
		});

		const walcMan = new WalkMan('WalkMan', 10, 100, {
			render: abilities.render,
		});

		super({
			name: name,
			abilities: abilities,
		}, [pac, walcMan]
		);
		// const pacman = ;
		// super.add(pacman);

		// super.add(walcMan);
	}

}