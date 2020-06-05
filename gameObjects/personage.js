// import { GameObject } from "./gameObject.js";
// import { Animator } from "../animations/animator.js";
// import { Vector2 } from "../geometry/vectors.js";
// import { throwIfNotInstance } from "../tools/classUtils.js";
import { Body, Moving, State } from "./bodies.js";
import { AnimDrawing, EmptyDrawing } from "./drawings.js";
import { Updatable } from "./common.js";
// import { Input } from "../inputs/input.js";

export class Personage extends Updatable {
	#name = 'noName';
	get name() { return this.#name }
	#assembly;
	get pos() {
		return this.#assembly.body.pos;
	}

	constructor(name, x, y, wi, he, image, animations, input, render) {
		super();
		this.#name = name;
		const b = new Moving(input,
			new Body(x, y, wi, he, new State()));
		this.#assembly = new AnimDrawing(image, animations,
			new EmptyDrawing(render, b));
	}

	update() {
		this.#assembly.update();
	}

}