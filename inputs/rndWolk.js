import { Input } from "./input.js";
import { RndCounter } from "../tools/counters.js";

export class Walker extends Input {
	#current;

	constructor(timeoutFunc, commandFunc) {
		super('Walker');

		const loop = () => {
			const nextCommand = commandFunc();
			this.#current = nextCommand;
			this.event.call(this.#current);
			// console.log(this.#current);
			setTimeout(loop, timeoutFunc());
		}
		loop();
	}

	get() {
		return [this.#current];
	}
}

export class RndWalk extends Walker {
	constructor() {
		const commands = ['idle', 'moveRight', 'moveLeft', 'moveDown', 'moveUp'];
		const counter = new RndCounter(0, commands.length - 1);

		super(
			() => Math.floor(Math.random() * 5000),
			() => commands[counter.next]
		);
	}
}