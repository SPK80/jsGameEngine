import { IGameObject } from "../gameObjects/common.js";
import { Composite, SortingComposite, ResistantComposite } from "../gameObjects/composite.js";
import { IntersectComposite } from "../gameObjects/phisics/intersect.js";

export class Scene extends IGameObject {
	#assembly;
	#events = [];

	addEvent(name, callback) {
		const i = this._findEventIndex(name);
		if (i) {
			this.#events[i].subscribe(callback);
		} else {
			this.#events.push(new GameEvent(name, callback));
		}
	}

	constructor(objects, intersectDetect) {
		super();
		this.#assembly = new IntersectComposite(intersectDetect,
			new ResistantComposite(0.1,
				new SortingComposite(
					new Composite(objects))));
	}

	addObject(object) {
		this.#assembly.add(object);
	}

	removeObject(object) {
		this.#assembly.remove(object);
	}

	getObject(name) {
		this.#assembly.get(name);
	}

	update() {
		this.#assembly.update();
	}
}


class GameEvent {
	#name = '';

	constructor(name, firstCallbacks) {
		this.#name = name;
		if (firstCallbacks) subscribe(firstCallbacks);
	}
	#callbacks = [];

	subscribe(callback) {
		this.#callbacks.push(callback);
	}

	unsubscribe(callback) {
		const i = this.#callbacks.indexOf(callback);
		delete this.#callbacks[i];
	}

	call(args) {
		this.#callbacks.forEach(callback => {
			callback(args);
		});
	}
}