import { State, MoveStates, IdleStates } from "./state.js";
import { numberRound } from "../tools/extentions.js";
import { PulsesEvent } from "./phisics/pulsesSource.js";
import { MovingBodyDec, MassivBodyDec } from "./bodies/bodyDecorators.js";
import { AnimDrawing } from "./drawings/drawings.js";
import { IInput, EnptyInput } from "../inputs/input.js";
import { throwIfNotInstance } from "../tools/utils.js";
import { GameObject } from "./gameObject.js";
numberRound();

export class Personage extends GameObject {
	#state;
	get state() { return this.#state }//change: return this.#state.get()

	decorateState(_class, ...params) {
		this.#state = new _class(...params, this.#state);
	}

	#input;
	setInput(input) {//rename plugControl
		// this.#input.delete();
		this.#input.setInput(input); 
//change: input.onIncoming((commands)=>{
controlledBehavior(commands);
}
	}

unplugControl(){
...
}

controlledBehavior(commands){
...
}

ownBehavior(){
...
}


	#onPulses;

	constructor(name, pos, size,
		tiles, animations, render) {
		super(name, render, pos, size);
		this.#input = new InputDecor(new EnptyInput());
		this.#onPulses = new PulsesEvent(this.#input); // change to PulsesGenerator(this.#state)
		// this.#onPulses.onIncoming(()=>);
		// this.#onPulses.subscribe((n, p) => console.log(n, p));
		this.decorateBody(MovingBodyDec, 0.1);
		this.decorateBody(MassivBodyDec, 1, this.#onPulses);
		this.#state = new PersonageState(name + 'State', this.body.velocity, this.#onPulses);
		this.decorateDrawing(AnimDrawing, tiles, animations, this.#state);
	}

	#textAbove = function (text) {
		this.drawing.render.text(
			this.body.pos.x,
			this.body.pos.y,
			text,
			'red',
			'12px arial',
			true);
	}

	update() {
		this.#onPulses._update();
		super.update();
	}
}

class PersonageState extends State {
	#velocity;
	#threshold;

	constructor(name, velocity, onPulses, threshold = 0.1) {
		super(name, [
			IdleStates.idle,
			MoveStates.moveDown,
			MoveStates.moveUp,
			MoveStates.moveLeft,
			MoveStates.moveRight
		]);
		this.#velocity = velocity;
		this.#threshold = threshold;

		onPulses.subscribe((name, pulses) => {
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

class InputDecor extends IInput {
	#input = new EnptyInput();
	setInput(input) {
		if (input)
			this.#input = throwIfNotInstance(input, IInput);
	};

	constructor(input) {
		super();
		this.setInput(input);
	}

	get() {
		const result = this.#input.get();
		return result;
	}

	onIncoming(callback) {
		this.#input.onIncoming(callback);
	}
}
