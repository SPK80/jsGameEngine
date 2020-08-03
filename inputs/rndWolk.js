import { Input } from "./input.js";
import { RndCounter } from "../tools/counters.js";

export class Walker extends Input {
	#current;
	constructor(timeoutFunc, commandFunc) {
		super();

		const loop = () => {
			const nextCommand = commandFunc();
			this.#current = nextCommand;
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
		super(() => Math.floor(Math.random() * 5000),
			() => commands[counter.next]);
	}
}

// export class RndWalk2 extends Walker {
// 	constructor(targetBody) {
// 		const commands = ['idle', 'moveRight', 'moveLeft', 'moveDown', 'moveUp'];

// 		const counter = new RndCounter(0, commands.length - 1);


// 		super(() => Math.floor(Math.random() * 5000),
// 			() => commands[counter.getNext()]);
// 	}
// }