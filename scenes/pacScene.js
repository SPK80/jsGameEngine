import { Scene } from "./scene.js";
import { Pacman } from "../gameObjects/pacman.js";
import { WalkMan } from "../gameObjects/walkMan.js";

export class PacScene extends Scene {

	constructor(name, drivers) {

		const pac = new Pacman('Pacman', 100, 100, '#00F0FF', 50);

		// const walcMan = new WalkMan('WalkMan', 10, 100, {
		// 	render: abilities.render,
		// });

		super({
			name: name,
			drivers: drivers,
		}, [pac]
		);
		// const pacman = ;
		// super.add(pacman);

		// super.add(walcMan);
	}

}