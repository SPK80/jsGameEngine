import { Composite } from "../gameObjects/composite.js";

export class Scene {

	#children = new Composite();
	decorateChildren(_class, ...params) {
		this.#children = new _class(...params, this.#children);
	}

	addObject(object) {
		this.#children.add(object);
	}

	removeObject(object) {
		this.#children.remove(object);
	}

	getObject(name) {
		return this.#children.get(name);
	}

	update() {
		this.#children.update();
	}
}