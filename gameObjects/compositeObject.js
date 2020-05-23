import { GameObjects } from "./gameObjects.js";
import { clone } from "../tools/utils.js";
import { LocalRender } from "../graphics/renders.js";
import { EmptyObject } from "./emptyObject.js";

export class CompositeObject extends EmptyObject {
	#objects;
	get Objects() { return this.#objects };

	constructor(params) {
		super(params);
		this.#objects = new GameObjects(
			params.objects ? params.objects : [],
			params.sortBy);
	}

	update(drivers) {
		super.update(drivers);

		const _drivers = clone(drivers);
		_drivers.render = new LocalRender(drivers.render, this.x, this.y);

		const objects = this.#objects.get();
		objects.forEach(obj => {
			obj.update(_drivers);
		});
	}
}