import { Input } from "./input.js";
import { RndCounter } from "../tools/counters.js";

export class Walker extends Input {
	#current;

	constructor(timeoutFunc, commandFunc) {
		super('Walker');

		const loop = () => {
			const nextCommand = commandFunc();
			this.#current = nextCommand;
			this._event.call(this.#current);
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

// class Walker extends Generator {
// 	#current;
// 	#stateTimer;
// 	// #eventTimer;

// 	constructor(timeoutFunc, commandFunc) {
// 		super('Walker', 100);

// 		const stateLoop = () => {
// 			const nextCommand = commandFunc();
// 			this.#current = nextCommand;
// 			this.#stateTimer = setTimeout(stateLoop, timeoutFunc());
// 		}
// 		stateLoop();
// 		// this.#eventTimer = setInterval(() => { this._event.call(this.#current) }, eventInterval);
// 	}

// 	get() {
// 		return [this.#current];
// 	}

// 	stop() {
// 		// clearInterval(this.#eventTimer);
// 		super.stop();
// 		clearTimeout(this.#stateTimer);
// 	}
// }

class Generator extends Input {
	#timer;
	// #input;
	#data;
	#stoped = false;

	constructor(name, interval) {
		super(name);
		// this.#input = throwIfNotInstance(input, IInput);
		this.onIncoming((data) => this.#data = data);

		this.#eventTimer = setInterval(() => {
			this._event.call(this.#data);
			if (this.#stoped) return true;
		}, interval);
	}


	stop() {
		this.#stoped = true;
		clearInterval(this.#timer);
	}

}