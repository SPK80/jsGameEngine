import { ISource } from "../inputs/input.js";
import { GameEvent } from "./events/gameEvent.js";

export class State extends ISource {

	#def = '';
	constructor(name, available, def) {
		super(name);
		if (def)
			this.#def = def;
		else
			this.#def = available[0];

		this.#available.push(...available);
	}

	#available = [];

	#state = '';

	get() {
		return this.#state;
	}

	#onChanged = new GameEvent('State');

	onIncoming(callback) {
		this.#onChanged.subscribe(callback);
	}

	set(value) { //-protected
		// if (this.#available.includes(state))
		this.#state = value;
		this.#onChanged.call(this.#state);
	}
}