import { BaseObject } from "../gameObjects/gameObject.js";
import { Objects } from "../objects.js";

export class Scene extends BaseObject {
	// #settings = null;
	#name = '';
	get name() { return this.#name };

	#objects = null;

	constructor(params, objects) {
		super(params);
		this.#objects = new Objects(objects);
	}

	add(gameObject) {
		this.#objects.add(gameObject);
	}

	update() {
		this.render.clear();
		const objects = this.#objects.get();
		// console.log(objects);

		// for (const obj of objects) {
		// 	obj.update();
		// }
		for (const key in objects) {
			if (objects.hasOwnProperty(key)) {
				const obj = objects[key];
				obj.update();
			}
		}
		// objects.forEach(obj => {
		// 	obj.update();
		// });
	}
}