import { Body, Moving, State } from "./bodies.js";
import { AnimDrawing, EmptyDrawing } from "./drawings.js";
import { IUpdating } from "./common.js";

export class Personage extends IUpdating {
	#name = 'noName';
	get name() { return this.#name }
	#assembly;
	get pos() {
		return this.#assembly.body.pos;
	}

	constructor(name, x, y, wi, he, image, animations, input, render) {
		super();
		this.#name = name;
		const body = new Moving(input,
			new Body(x, y, wi, he, new State()));
		this.#assembly = new AnimDrawing(image, animations,
			new EmptyDrawing(render, body));
	}

	update() {
		this.#assembly.update();
	}
}