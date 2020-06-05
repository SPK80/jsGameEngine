import { IUpdating } from "./common.js";
import { DrawingDecorator } from "./drawings.js";
import { bublleFindIndex } from "../tools/bublleFind.js";
import { throwIfNotInstance } from "../tools/utils.js";

export class Composite extends DrawingDecorator {
	#items = [];
	#sortByZ = true;
	#sortByY = true;

	constructor(items, sortBy, object) {
		super(object);

		if (sortBy) {
			this.#sortByZ = sortBy.z ? true : false;
			this.#sortByY = sortBy.y ? true : false;
		}
		items.forEach(it => {
			throwIfNotInstance(it, IUpdating)
			this.add(it);
		});
	}


	get(name) {
		if (name == undefined) {
			if (this.#sortByY)
				return this.#items.sort((a, b) => a.y - b.y);
			else
				return this.#items;
		}
		else
			return this.#items.find(it => it.name == name);
	}

	add(item) {
		if (item instanceof IUpdating) {
			if (this.get(item.name)) return;
			if (this.#sortByZ) {
				const index = bublleFindIndex(item.pos.z, this.#items.length,
					(i) => this.#items[i].pos.z);
				this.#items.splice(index, 0, item);
			} else this.#items.push(item);
		}
	}

	remove(item) {
		if (item instanceof IUpdating) {
			const i = this.#items.indexOf(item);
			if (i >= 0) delete this.#items[i];
		}
		else if (typeof (item) == 'string') {
			remove(this.get(item.name));
		}
	}

	update() {
		// console.log('Composite', this);
		super.update();

		this.get().forEach(item => {
			item.update();
		});
	}
}
// export class CompositeObject extends EmptyObject {
// 	#objects;
// 	get Objects() { return this.#objects };

// 	constructor(params) {
// 		super(params);
// 		this.#objects = new GameObjects(
// 			params.objects ? params.objects : [],
// 			params.sortBy);
// 	}

// 	update(drivers) {
// 		super.update(drivers);

// 		const _drivers = clone(drivers);
// 		_drivers.render = new LocalRender(drivers.render, this.x, this.y);

// 		const objects = this.#objects.get();
// 		objects.forEach(obj => {
// 			obj.update(_drivers);
// 		});
// 	}
// }