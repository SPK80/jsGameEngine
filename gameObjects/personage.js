import { Body, Moving, InteractiveBody } from "./bodies.js";
import { AnimDrawing, EmptyDrawing } from "./drawings.js";
import { IGameObject } from "./common.js";
import { Input } from "../inputs/input.js";
import { PhisicsBody } from "./phisicsBody.js";
import { Vector3 } from "../geometry/vectors.js";
// import { LasyInput } from "../inputs/LasyInput.js";

export class Personage extends IGameObject {
	#name = 'noName';
	get name() { return this.#name }

	#assembly;
	#moving;

	setInput(input) {
		this.#moving.input = input;
	}

	get body() { return this.#moving }

	// init(targetsInput) {
	// 	this.#targetsInput.init(targetsInput.get);
	// }

	// #targetsInput = new LasyInput();

	constructor(name, x, y, wi, he, input,
		tiles, animations, render) {
		super();
		this.#name = name;
		this.#moving = new PhisicsBody(new ForcesSource(input), 0.00001, 1,
			new Body(x, y, 1, wi, he));

		this.#assembly =
			new AnimDrawing(tiles, animations,
				new EmptyDrawing(render, this.#moving));
	}

	update() {
		this.#assembly.update();
		this.#assembly.render.text(
			this.body.pos.x,
			this.body.pos.y,
			`${this.#moving.velocity.x} ${this.#moving.velocity.y}`,
			'red',
			'12px arial',
			true);
	}
}

class ForcesSource extends Input {
	#input;
	constructor(input) {
		super();
		this.#input = input;
	}

	get() {
		const actions = this.#input.get();
		const forces = [];
		actions.forEach(act => {
			if (act == 'moveRight') forces.push(new Vector3(1, 0, 0));
			if (act == 'moveLeft') forces.push(new Vector3(-1, 0, 0));
			if (act == 'moveDown') forces.push(new Vector3(0, 1, 0));
			if (act == 'moveUp') forces.push(new Vector3(0, -1, 0));
		});
		return forces;
	}
}