import { Composite } from "./composite.js";
import { BodyGameObject } from "./gameObject.js";

export class CompositeGameObject extends BodyGameObject {
	#children = new Composite();
	get children() { return this.#children }

	decorateChildren(_class, ...params) {
		this.#children = new _class(...params, this.#children);
	}

	update() {
		super.update();
		this.#children.update();
	}
}