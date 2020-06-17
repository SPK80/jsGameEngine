import { Composite } from "../gameObjects/composite.js";
import { EmptyDrawing } from "../gameObjects/drawings.js";
import { Body } from "../gameObjects/bodies.js";
import { IGameObject } from "../gameObjects/common.js";

export class Scene extends IGameObject {
	#assembly;

	constructor(objects, render) {
		super();
		this.#assembly = new Composite(objects,
			new EmptyDrawing(render,
				new Body(0, 0, 0, render.width, render.height)));
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