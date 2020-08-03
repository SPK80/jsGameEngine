import { CompositeGameObject } from "../gameObjects/compositeGameObject.js";

export class Scene extends CompositeGameObject {

	constructor(name) {
		super(name);
	}

	addObject(object) {
		this.children.add(object);
	}

	removeObject(object) {
		this.children.remove(object);
	}

	getObject(name) {
		return this.children.get(name);
	}
}