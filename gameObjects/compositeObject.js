import { GameObject } from "./gameObject.js";
import { GameObjects } from "./gameObjects.js";

export class CompositeObject extends GameObject {

	#objects;
	get Objects() { return this.#objects };

	// addObject(obj) {
	// 	this.#objects.add(obj);
	// }

	// removeObject(obj){
	// 	this.#objects.remove(obj);
	// }

	constructor(params, objects, sortByZ = true) {
		super(params);
		this.#objects = new GameObjects(objects, sortByZ);
	}

	update(drivers){
		// const render = drivers.render;
		const objects = this.#objects.get();
		objects.sort((a, b) => a.y - b.y);

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