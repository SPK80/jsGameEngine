import { GameEvent } from "./gameEvent.js";
import { throwIfNotInstance } from "../../tools/utils.js";

export class Events {
	#events = [];

	find(eventName) { return this.#events.find(e => e.name == eventName); }

	call(eventName, args) {
		const event = this.find(eventName);
		if (event)
			event.call(args);
	}

	subscribe(eventName, callback) {
		const event = this.find(eventName);
		if (event) {
			event.subscribe(callback);
		}
		else {
			this.#events.push(new GameEvent(eventName, callback));
		}
	}

	add(event) {
		throwIfNotInstance(event, GameEvent);
		if (this.find(event.name))
			throw (`${event} already available`)
		this.#events.push(event);
	}

	remove(event) {
		const i = this.#events.indexOf(event);
		if (i >= 0)
			delete this.#events[i];
	}
}