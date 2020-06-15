import { Input } from "./input.js";
import { RndCounter } from "../tools/counters.js";

export class RndWolk extends Input {
	#commands = ['idle', 'moveRight', 'moveLeft', 'moveDown', 'moveUp'];
	#counter = new RndCounter(0, this.#commands.length - 1);
	#current = this.#commands[0];

	get() {
		return [this.#commands[this.#current]];
	}

	#timer;
	constructor() {
		super();

		const loop = () => {
			this.#current = this.#counter.getNext();
			this.#timer = setTimeout(loop, Math.floor(Math.random() * 5000));
		}
		loop();
	}
}

export class Stand extends Input {
	#commands = ['idle'];

	get() {
		return this.#commands;
	}

	constructor() {
		super();
	}
}