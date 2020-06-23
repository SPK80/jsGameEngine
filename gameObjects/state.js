import { Input } from "../inputs/input.js";
export class State extends Input {

	#def = '';
	constructor(def = 'idle') {
		super();
		this.#def = def;
	}

	#states = [];

	get() {
		if (this.#states.length > 0)
			return this.#states.pop();
		else return this.#def;
	}

	set(state) {
		this.#states.push(state);
	}
}