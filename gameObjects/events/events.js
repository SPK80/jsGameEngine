import { GameEvent } from "./gameEvent.js";

export class Events {
	#events = [];
	find(eventName) { return this.#events.find(e => e.name == eventName); }

	call(eventName, args) {
		const event = this.find(eventName);
		if (event)
			event.call(args);
	}

	listen(eventName, callback) {
		const event = this.find(eventName);
		if (event) {
			event.subscribe(callback);
		}
		else {
			this.#events.push(new GameEvent(eventName, callback));
		}
	}
}
