import { BaseObject } from "../gameObjects/gameObject.js";
import { GameObjects } from "../objects.js";

export class Scene extends BaseObject {
	// #settings = null;
	#name = '';
	get name() { return this.#name };

	#objects = null;
	#objectInputDrivers = [];

	constructor(params, objects) {
		super(params);
		this.#objects = new GameObjects(objects);

		// objectInputDrivers.forEach(driver => {
		// 	addObjectInputDriver(driver);
		// });
	}

	addObject(gameObject) {
		this.#objects.add(gameObject);
	}

	// addObjectInputDriver(driver) {
	// 	this.#objectInputDrivers.push(driver);
	// }

	setInput(objectName, input) {
		const obj = this.#objects.get(objectName);
		const driver = new ObjectInputDriver(obj, input);
		console.log(driver);

		this.#objectInputDrivers.push(driver);
	}

	update(drivers) {
		this.#objectInputDrivers.forEach(driver => {
			driver.do();
		});
		const render = drivers.render;
		render.clear();

		const objects = this.#objects.get();
		objects.forEach(obj => {
			obj.update(drivers);
		});
	}
}

class ObjectInputDriver {
	#object = null;
	#input = null;

	constructor(object, input) {
		this.#object = object;
		this.#input = input;
	}

	do() {
		const commands = this.#input.get();
		commands.forEach(comm => {
			this.#object[comm]();
		});
	}
}