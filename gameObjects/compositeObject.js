import { GameObject } from "./gameObject.js";
import { GameObjects } from "./gameObjects.js";
import { clone } from "../tools/utils.js";

export class CompositeObject extends GameObject {

	#objects;
	get Objects() { return this.#objects };

	constructor(params) {
		super(params);
		this.#objects = new GameObjects(params.objects, params.sortBy);
	}

	update(drivers) {
		const _drivers = clone(drivers);
		_drivers.render = new LocalRender(drivers.render, this.x, this.y);;

		const objects = this.#objects.get();
		objects.forEach(obj => {
			obj.update(_drivers);
		});
	}
}