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
		throwIfNotInstance(input, Input);
		const obj = this.#objects.get(objectName);
		if (obj)
			this.#objectControllers.push({ object: obj, input: input });
	}

	update(drivers) {
		let debug = '';
		const render = drivers.render;
		render.clear();

		const objects = this.#objects.get();
		let t = performance.now();
		objects.sort((a, b) => a.y - b.y);
		debug = `${Math.round((performance.now() - t)*1000)}`;

		objects.forEach(obj => {
			let _drivers = {};
			const controller = this.#objectControllers.find((con) => con.object == obj);
			if (controller) {
				_drivers.input = controller.input;
			}
			obj.update(Object.assign(_drivers, drivers));
		});

		render.text({
			text: debug,
			x: 5,
			y: 20,
			color: 'red',
		});
	}
}