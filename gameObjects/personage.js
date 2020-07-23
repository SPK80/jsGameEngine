import { Body, MassivBody } from "./bodies.js";
import { AnimDrawing, EmptyDrawing } from "./drawings.js";
import { IGameObject, InteractGameObject } from "./common.js";
import { Input } from "../inputs/input.js";
// import { MassBody, NonMassBody } from "./phisics/phisicsBody.js";
import { Vector2 } from "../geometry/vectors.js";
import { State, MoveStates, IdleStates } from "./state.js";
import { numberRound } from "../tools/extentions.js";
numberRound();

export class Personage extends InteractGameObject {
	#name = 'noName';
	get name() { return this.#name }

	#assembly;
	#body;

	#input;

	setInput(input) {
		this.#input = input;
	}

	#state;

	get body() { return this.#body }

	constructor(name, x, y, wi, he, input,
		tiles, animations, render) {
		super();
		this.#name = name;
		this.#input = input;

		this.#body = new MassivBody(x, y, 1, wi, he, 1);

		this.#state = new PersonageState(this.#body.velocity,
			new PulsesSource(this.#input));

		this.#assembly = new AnimDrawing(tiles, animations, this.#state,
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

		const actions = this.#input.get();
		if (actions && actions.length > 0) {
			const pulse = new Vector2();
			actions.forEach(act => {
				if (act == 'moveRight') pulse.add(new Vector2(1, 0));
				if (act == 'moveLeft') pulse.add(new Vector2(-1, 0));
				if (act == 'moveDown') pulse.add(new Vector2(0, 1));
				if (act == 'moveUp') pulse.add(new Vector2(0, -1));
			});
			this.#body.pulse(pulse);
		}

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

	get() {
		const actions = this.#input.get();

		const pulses = [];
		actions.forEach(act => {
			// console.log(this.#predActions);
			//if (!this.#predActions.includes(act)) {
			if (act == MoveStates.moveRight) pulses.push(new Vector2(1, 0));
			if (act == MoveStates.moveLeft) pulses.push(new Vector2(-1, 0));
			if (act == MoveStates.moveDown) pulses.push(new Vector2(0, 1));
			if (act == MoveStates.moveUp) pulses.push(new Vector2(0, -1));
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

class PersonageState extends State {
	#velocity;
	#pulses;
	#threshold;

	constructor(velocity, pulsesSource, threshold = 0.1) {
		super([
			IdleStates.idle,
			MoveStates.moveDown,
			MoveStates.moveUp,
			MoveStates.moveLeft,
			MoveStates.moveRight
		]);
		this.#velocity = velocity;
		this.#pulses = pulsesSource;
		this.#threshold = threshold;
	}

	get() {
		const v = this.#velocity;
		const ax = Math.abs(v.x);
		const ay = Math.abs(v.y);

		if (ax <= this.#threshold &&
			ay <= this.#threshold) {
			super.set(IdleStates.idle);
		}

		const pulses = this.#pulses.get();
		if (pulses && pulses.length > 0) {
			const p = pulses[pulses.length - 1];

			if (p.x > this.#threshold) super.set(MoveStates.moveRight);
			if (p.x < -this.#threshold) super.set(MoveStates.moveLeft);
			if (p.y > this.#threshold) super.set(MoveStates.moveDown);
			if (p.y < -this.#threshold) super.set(MoveStates.moveUp);
		}
		return super.get();
	}
}