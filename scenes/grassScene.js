import { EmptyDrawing, ImageDrawing } from "../gameObjects/drawings.js";
import { Body } from "../gameObjects/bodies.js";
import { Scene } from "./scene.js";
import { Vector3 } from "../geometry/vectors.js";

export class GrassScene extends Scene {
	#landscape = { update() { } };

	constructor(render) {
		const grass = new Image();
		grass.addEventListener("load", () => {
			this.#landscape = new ImageDrawing(
				grass,
				new EmptyDrawing(render, new Body(0, 0, 0, grass.width, grass.height))
			);
		});
		grass.src = "grass.jpg";

		super([]);

		// this.listenEvent('interact', (args) => {
		// 	if (!args.body1 || !args.body2) throw ('body1 or body2 undifined', args);
		// 	const body1 = args.body1;
		// 	const body2 = args.body2;
		// 	const dist = new Vector3().add(body1.pos).sub(body2.pos).length;
		// 	return dist < 0.5 * (body1.size.length + body2.size.length);
		// });
	}

	update() {
		this.#landscape.update();
		super.update();
	}
}
