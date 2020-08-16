import { IGameObject } from "./common.js";
import { Vector2 } from "../geometry/vectors.js";
import { MovingBodyDec, MassivBodyDec } from "./bodies/bodyDecorators.js";
import { State } from "./state.js";
import { GameObject } from "./gameObject.js";
import { AnimDrawing } from "./drawings/drawings.js";
import { Executor } from "./tasks";

export class ReactiveGameObject extends GameObject {
	#unsubscribers = [];

	subscribeEvent(event, callback) {
		this.#unsubscribers.push(event.subscribe(callback));
	}

	remove() {
		this.#unsubscribers.forEach(unsubscriber => {
			unsubscriber();
		});
		this.#unsubscribers.clear();
	}
}

export class ReactivePersonage extends ReactiveGameObject {

	#state = new State();

	setControl(source) {
		// _subscribeEvent(source, (task) => { this.#state.set(task) });
	}

	#onPulses = new Pulses();

	#tasks = new Executor();

	constructor(name, render, pos, size, tiles, animations, onTask) {
		super(name, render, pos, size);

		this.decorateBody(MovingBodyDec, 0.1);
		this.decorateBody(MassivBodyDec, 1, this.#onPulses);
		this.decorateDrawing(AnimDrawing, tiles, animations, this.#state);

		subscribeEvent(onTask, (evName, newTask) => {
			this.#tasks.push(newTask);
		})
	}
}

class State {
	#state;
	get() {
		return this.#state;
	}
	set(value) {
		this.#state = value;
	}
}

class Pulses {

}