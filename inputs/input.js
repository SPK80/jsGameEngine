import { GameEvent } from "../gameObjects/events/gameEvent.js";

export class ISource {
	get() { throw ('get must be implemented') }
	onIncoming(callback) { throw ('onIncoming must be implemented') }
}

export class EnptyInput extends ISource {
	get() { return [] }
	onIncoming(callback) { }
}

export class Input extends ISource {
	_event;
	// get event() { return this.#event }
	constructor(name) {
		super();
		if (!name) throw ('name must be defined');
		this._event = new GameEvent(name);
	}

	onIncoming(callback) {
		this._event.subscribe(callback);
	}
}