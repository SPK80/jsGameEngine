import { Input } from "../inputs/input.js";

export class State extends Input {

	#def = '';
	constructor(name, available, def) {
		super(name);
		if (def)
			this.#def = def;
		else
			this.#def = available[0];

		this.#available.push(...available);
	}

	#state = '';
	#available = [];

	get() {
		return this.#state;
	}

	set(state) {
		if (this.#available.includes(state))
			this.#state = state;
	}
}

export const MoveStates = {
	moveRight : 'moveRight',
	moveLeft : 'moveLeft',
	moveDown : 'moveDown',
	moveUp : 'moveUp'
}

export const IdleStates ={
	idle : 'idle'
}