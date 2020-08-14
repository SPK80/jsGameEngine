import { IGameObject } from "./common.js";
import { Vector2 } from "../geometry/vectors.js";
import { MovingBodyDec, MassivBodyDec } from "./bodies/bodyDecorators.js";
import { State } from "./state.js";

export class ReactiveGameObject extends IGameObject {
	#name;
	get name() { return this.#name; }

	#body;
	get body() { return this.#body; }

	decorateBody(_class, ...params) {
		this.#body = new _class(...params, this.#body);
	}

	#drawing;
	get drawing() { return this.#drawing; }

	decorateDrawing(_class, ...params) {
		this.#drawing = new _class(...params, this.#drawing);
	}

	constructor(name, pos, size, render) {
		super();
		if (typeof name != "string") throw ('name must be string');
		this.#name = name;

		if (pos && size) {
			if (!(pos instanceof Vector2)) throw ('pos must be Vector2');
			if (!(size instanceof Vector2)) throw ('size must be Vector2');
			this.#body = new Body(pos.x, pos.y, pos.z, size.x, size.y);
		}
		else this.#body = new Body();

		this.#drawing = new EmptyDrawing(render, this.#body);
	}

	#unsubscribers = [];

	_subscribeEvent(event, callback) {
		this.#unsubscribers.push(event.unsubscribe(callback));
	}

	delete() {
		this.#unsubscribers.forEach(unsubscriber => {
			unsubscriber();
		});
		this.#unsubscribers.clear();
	}
}

export class ReactivePersonage extends ReactiveGameObject {

	#state = new State();
	setControl(source) {
		_subscribeEvent(source, (task) => { this.#state.set(task) });
	}

	constructor(name, pos, size, render, tiles, animations) {
		super(name, pos, size, render);

		this.decorateBody(MovingBodyDec, 0.1);
		this.decorateBody(MassivBodyDec, 1, this.#onPulses);

		this.decorateDrawing(AnimDrawing, tiles, animations, this.#state);

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