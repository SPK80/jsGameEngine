import { Body, Moving } from "./bodies.js";
import { AnimDrawing, EmptyDrawing, ClearDrawing } from "./drawings.js";
import { IGameObject } from "./gameObject.js";

export class Personage extends IGameObject {
	#name = 'noName';
	get name() { return this.#name }

	#assembly;
	#moving;
	setInput(input) {
		this.#moving.input = input;
	}

	constructor(name, x, y, wi, he, input, tiles, animations, render) {
		super();
		this.#name = name;
		this.#moving = new Moving(input,
			new Body(x, y, 1, wi, he));

		this.#assembly =
			new AnimDrawing(tiles, animations,
				// new ClearDrawing(
					new EmptyDrawing(render, this.#moving));
	}

	update() {
		this.#assembly.update();
	}
}