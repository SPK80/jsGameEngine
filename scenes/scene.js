import { IGameObject } from "../gameObjects/common.js";
import { Composite, SortingComposite } from "../gameObjects/composite.js";


export class Scene extends IGameObject {
	#assembly;

	constructor(objects) {
		super();
		this.#assembly = new SortingComposite(
			new Composite(objects));
	}

	addObject(object) {
		this.#assembly.add(object);
	}

	removeObject(object) {
		this.#assembly.remove(object);
	}

	setInput(objectName, input) {
		const obj = this.#assembly.get(objectName);
		if (obj)
			obj.setInput(input);
	}

	update() {
		this.#assembly.update();
	}
}