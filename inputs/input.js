import { GameEvent } from "../gameObjects/events/gameEvent.js";

export class IInput {
	get() { throw ('get must be implemented') }
	subscribe(callback) { throw ('subscribe must be implemented') }
}

export class EnptyInput extends IInput {
	get() { return [] }
	subscribe(callback) { }
}

export class Input extends IInput {
	#event;
	get event() { return this.#event }

	constructor(name) {
		super();
		if (!name) throw ('name must be defined');
		this.#event = new GameEvent(name);
	}

	subscribe(callback) {
		this.#event.subscribe(callback);
	}
}