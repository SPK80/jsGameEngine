import { EmptyDrawing, ImageDrawing } from "../gameObjects/drawings.js";
import { Body } from "../gameObjects/bodies.js";
import { WhiteWolker } from "../gameObjects/whiteWolker.js";
import { RndWolk } from "../inputs/rndWolk.js";
import { Scene } from "./scene.js";

export class GrassScene extends Scene {
	#landscape = { update() { } };

	constructor(render, tiles) {
		const grass = new Image();
		grass.addEventListener("load", () => {
			this.#landscape = new ImageDrawing(
				grass,
				new EmptyDrawing(render, new Body(0, 0, 0, grass.width, grass.height))
			);
		});
		grass.src = "grass.jpg";

		const wws = [];
		// for (let i = 0;i < 9;i++) {
		// 	wws.push(
		// 		new WhiteWolker(
		// 			"WhiteWolker" + i,
		// 			Math.random() * render.width,
		// 			Math.random() * render.height,
		// 			new RndWolk(),
		// 			tiles,
		// 			render
		// 		)
		// 	);
		// }

		super(wws);
	}

	update() {
		this.#landscape.update();
		super.update();
	}
}
