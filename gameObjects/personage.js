import { Body } from "./bodies.js";
import { AnimDrawing, EmptyDrawing } from "./drawings.js";
import { IGameObject } from "./common.js";
import { Input } from "../inputs/input.js";
import { MassBody, NonMassBody } from "./phisics/phisicsBody.js";
import { Vector3 } from "../geometry/vectors.js";
import { State } from "./state.js";
import { numberRound } from "../tools/extentions.js";
numberRound();

export class Personage extends IGameObject {
	#name = 'noName';
	get name() { return this.#name }

	#assembly;
	#body;

	setInput(input) {
		this.#body.input = input;
	}

	get body() { return this.#body }

	// init(targetsInput) {
	// 	this.#targetsInput.init(targetsInput.get);
	// }

	// #targetsInput = new LasyInput();

	constructor(name, x, y, wi, he, input,
		tiles, animations, render) {
		super();
		this.#name = name;
		this.#body = new MassBody(new ForcesSource(input), 0.1, 1,
			new Body(x, y, 1, wi, he));

		this.#assembly = new AnimDrawing(tiles, animations,
			new EmptyDrawing(render, this.#body));
	}

	update() {
		this.#assembly.update();

		const vx = this.#body.velocity.x.round(2);
		const vy = this.#body.velocity.y.round(2);
		this.#assembly.render.text(
			this.body.pos.x,
			this.body.pos.y,
			`${this.#body.state.get()} ${vx} ${vy}`,
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

	// #predActions = [];

	get() {
		const actions = this.#input.get();

		const forces = [];
		actions.forEach(act => {
			// console.log(this.#predActions);
			//if (!this.#predActions.includes(act)) {
			if (act == 'moveRight') forces.push(new Vector3(1, 0, 0));
			if (act == 'moveLeft') forces.push(new Vector3(-1, 0, 0));
			if (act == 'moveDown') forces.push(new Vector3(0, 1, 0));
			if (act == 'moveUp') forces.push(new Vector3(0, -1, 0));
			// if (act == 'idle') forces.push(new Vector3(0, 0, 0));
			//}
		});
		// this.#predActions = actions.slice();
		return forces;
	}
}

class LastInputState extends State {
	#input;

	constructor(input, def = 'idle') {
		super(def);
		this.#input = input;
	}

	get() {
		const inp = this.#input.get();
		if (inp && inp.length > 0) {
			const state = inp[inp.length - 1];
			// this.set(state);
			return state;
		}
		else
			return super.get();
	}
}