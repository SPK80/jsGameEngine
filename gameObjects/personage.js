import { Body, Moving, InteractiveBody } from "./bodies.js";
import { AnimDrawing, EmptyDrawing } from "./drawings.js";
import { IGameObject } from "./common.js";
import { LasyInput } from "../inputs/LasyInput.js";

export class Personage extends IGameObject {
	#name = 'noName';
	get name() { return this.#name }

	#assembly;
	#moving;
	
	setInput(input) {
		this.#moving.input = input;
	}

	get body() { return this.#moving }

	init(targetsInput) {
		this.#targetsInput.init(targetsInput.get);
	}

	#targetsInput = new LasyInput();

	constructor(name, x, y, wi, he, input,
		tiles, animations, render, behavior) {
		super();
		this.#name = name;
		this.#moving = new InteractiveBody(this.#targetsInput, behavior,
			new Moving(input,
				new Body(x, y, 1, wi, he)));

		this.#assembly =
			new AnimDrawing(tiles, animations,
				new EmptyDrawing(render, this.#moving));
	}

	update() {
		this.#assembly.update();
	}
}