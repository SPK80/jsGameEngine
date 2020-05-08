import { Input } from "../inputs/input.js";
import { BaseObject } from "../gameObjects/gameObject.js";
import { GameObjects } from "../gameObjects/gameObjects.js";
import { throwIfNotInstance } from "../tools/classUtils.js";

export class Scene extends BaseObject {
	// #settings = null;
	#name = '';
	get name() { return this.#name };

	#objects = null;
	#objectInputDrivers = new ObjectInputDrivers();

	constructor(params, objects) {
		super(params);
		this.#objects = new GameObjects(objects);
	}

	addObject(gameObject) {
		this.#objects.add(gameObject);
	}

	setInput(objectName, input) {
		const obj = this.#objects.get(objectName);
		this.#objectInputDrivers.add(obj, input);
	}

	update(drivers) {
		this.#objectInputDrivers.do();
		const render = drivers.render;
		render.clear();

		const objects = this.#objects.get();

		objects.forEach(obj => {
			obj.update(drivers);
		});
	}
}

class ObjectInputDrivers {

	#ObjectInputDriver = class {
		#object = null;
		#input = null;

		constructor(object, input) {
			throwIfNotInstance(object, BaseObject);
			this.#object = object;
			throwIfNotInstance(input, Input);
			this.#input = input;
		}

		do() {
			const commands = this.#input.get();
			commands.forEach(comm => {
				this.#object[comm]();
			});
		}
	}

	#items = [];
	
	add(obj, input) {
		const driver = new this.#ObjectInputDriver(obj, input);
		this.#items.push(driver);
	}

	do() {
		this.#items.forEach(driver => {
			driver.do();
		});
	}
}
