import { UpdateDecorator } from "./interface.js";
import { Input } from "../../inputs/input.js";
import { Animator } from "../../animations/animator.js";

export class Animating extends UpdateDecorator {
	#animator;
	// #speed = 1;
	#state;

	constructor(state, animations, object) {
		super(object);

		this.#animator = new Animator(animations);
		this.#state = throwIfNotInstance(state, Input);
	}

	getFrame() {
		return this.#animator.curFrame;
	}

	update() {
		this.#animator.start(this.#state.get());
	}
}