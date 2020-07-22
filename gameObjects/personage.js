import { Body } from "./bodies.js";
import { AnimDrawing, EmptyDrawing } from "./drawings.js";
import { IGameObject, InteractGameObject } from "./common.js";
import { Input } from "../inputs/input.js";
import { MassBody, NonMassBody } from "./phisics/phisicsBody.js";
import { Vector3 } from "../geometry/vectors.js";
import { State } from "./state.js";
import { numberRound } from "../tools/extentions.js";
numberRound();

export class Personage extends InteractGameObject {
	#name = 'noName';
	get name() { return this.#name }

	#assembly;
	#body;

	setInput(input) {
		this.#body.input = input;
	}

	get body() { return this.#body }

	constructor(name, x, y, wi, he, input,
		tiles, animations, render) {
		super();
		this.#name = name;
		this.#body = new MassBody(new PulsesSource(input), 0.1, 1,
			new Body(x, y, 1, wi, he));

		this.#assembly = new AnimDrawing(tiles, animations,
			new EmptyDrawing(render, this.#body));
	}

	#intersectTarget = this;
	interaction(obj) {
		this.#intersectTarget = obj;
	}

	#textAbove = function (text) {
		this.#assembly.render.text(
			this.body.pos.x,
			this.body.pos.y,
			text,
			'red',
			'12px arial',
			true);
	}

	update() {
		this.#assembly.update();
		if (this.#intersectTarget != this)
			this.#textAbove(this.#intersectTarget.name);
		this.#intersectTarget = this;

		// const vx = this.#body.velocity.x.round(2);
		// const vy = this.#body.velocity.y.round(2);
		// this.#textAbove(`${this.#body.state.get()} ${vx} ${vy}`);
	}
}

class PulsesSource extends Input {
	#input;
	constructor(input) {
		super();
		this.#input = input;
	}

	// #predActions = [];

	get() {
		const actions = this.#input.get();

		const pulses = [];
		actions.forEach(act => {
			// console.log(this.#predActions);
			//if (!this.#predActions.includes(act)) {
			if (act == 'moveRight') pulses.push(new Vector3(1, 0, 0));
			if (act == 'moveLeft') pulses.push(new Vector3(-1, 0, 0));
			if (act == 'moveDown') pulses.push(new Vector3(0, 1, 0));
			if (act == 'moveUp') pulses.push(new Vector3(0, -1, 0));
			// if (act == 'idle') forces.push(new Vector3(0, 0, 0));
			//}
		});
		// this.#predActions = actions.slice();
		return pulses;
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