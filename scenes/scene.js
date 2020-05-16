import { Input } from "../inputs/input.js";
import { BaseObject } from "../gameObjects/gameObject.js";
import { GameObjects } from "../gameObjects/gameObjects.js";
import { throwIfNotInstance } from "../tools/classUtils.js";

export class Scene extends BaseObject {
	// #settings = null;
	#name = '';
	get name() { return this.#name };

	#objects = null;
	#objectControllers = [];

	constructor(params, objects) {
		super(params);
		this.#objects = new GameObjects(objects);
	}

	addObject(gameObject) {
		this.#objects.add(gameObject);
	}

	setInput(objectName, input) {
		const obj = this.#objects.get(objectName);
		if (obj)
			this.#objectControllers.push({ object: obj, input: input });
	}

	update(drivers) {
		const render = drivers.render;
		render.clear();

		const objects = this.#objects.get();

		objects.forEach(obj => {
			let _drivers = {};
			const controller = this.#objectControllers.find((con) => con.object == obj);
			if (controller) {
				_drivers.input = controller.input;
			}
			obj.update(Object.assign(_drivers, drivers));
		});
	}
}