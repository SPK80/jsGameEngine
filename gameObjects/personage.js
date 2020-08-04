import { IGameObject, IUpdating } from "./common.js";
import { State, MoveStates, IdleStates } from "./state.js";
import { numberRound } from "../tools/extentions.js";
import { PulsesEvent } from "./phisics/pulsesSource.js";
import { Body } from "./bodies/bodies.js";
import { MovingBodyDec, MassivBodyDec } from "./bodies/bodyDecorators.js";
import { AnimDrawing, EmptyDrawing } from "./drawings/drawings.js";
import { Input } from "../inputs/input.js";
import { throwIfNotInstance } from "../tools/utils.js";
import { LasyInput } from "../inputs/lasyInput.js";
numberRound();

export class Personage extends IGameObject {
	#name = 'noName';
	get name() { return this.#name }

	#body;
	get body() { return this.#body }

	decorateBody(_class, ...params) {
		this.#body = new _class(...params, this.#body);
	}

	#drawing;
	get drawing() { return this.#drawing }

	decorateDrawing(_class, ...params) {
		this.#drawing = new _class(...params, this.#drawing);
	}

	#state;
	get state() { return this.#state }

	decorateState(_class, ...params) {
		this.#state = new _class(...params, this.#state);
	}

	#input;
	setInput(input) { this.#input.setInput(input); }

	#onPulses;

	constructor(name, x, y, wi, he, input,
		tiles, animations, render) {
		super();
		this.#name = name;

		this.#input = new InputDecor(input);

		this.#onPulses = new PulsesEvent(this.#input);

		this.#body = new MassivBodyDec(1, this.#onPulses,
			new MovingBodyDec(0.1,
				new Body(x, y, 1, wi, he)));

		this.#state = new PersonageState(this.#body.velocity, this.#onPulses);

		this.#drawing = new AnimDrawing(tiles, animations, this.#state,
			new EmptyDrawing(render, this.#body));

	}

	#textAbove = function (text) {
		this.#drawing.render.text(
			this.body.pos.x,
			this.body.pos.y,
			text,
			'red',
			'12px arial',
			true);
	}

	update() {
		this.#onPulses.update();
		this.#body.update();
		this.#drawing.update();
	}
}

class PersonageState extends State {
	#velocity;
	#threshold;

	constructor(velocity, onPulses, threshold = 0.1) {
		super([
			IdleStates.idle,
			MoveStates.moveDown,
			MoveStates.moveUp,
			MoveStates.moveLeft,
			MoveStates.moveRight
		]);
		this.#velocity = velocity;
		this.#threshold = threshold;

		onPulses.subscribe((pulses) => {
			if (pulses && pulses.length > 0) {
				const p = pulses[pulses.length - 1];

				if (p.x > this.#threshold) super.set(MoveStates.moveRight);
				if (p.x < -this.#threshold) super.set(MoveStates.moveLeft);
				if (p.y > this.#threshold) super.set(MoveStates.moveDown);
				if (p.y < -this.#threshold) super.set(MoveStates.moveUp);
			}
		});
	}

	get() {
		const v = this.#velocity;
		const ax = Math.abs(v.x);
		const ay = Math.abs(v.y);

		if (ax <= this.#threshold &&
			ay <= this.#threshold) {
			super.set(IdleStates.idle);
		}

		return super.get();
	}
}

class InputDecor extends Input {
	#input;
	setInput(input) {
		this.#input = throwIfNotInstance(input, Input);
	};

	constructor(input) {
		super();
		this.#input = input;
	}

	get() {
		const result = this.#input.get();
		return result;
	}
}