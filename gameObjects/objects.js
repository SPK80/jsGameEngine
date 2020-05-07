import { BaseObject } from "./gameObject.js";

export class GameObjects {
	#items = [];
	#sortByZ = true;
	constructor(items, sortByZ = true) {
		this.#sortByZ = sortByZ;

		items.forEach(it => {
			this.add(it);
		});
	}

	get(name) {
		if (name == undefined)
			return this.#items;
		else
			return this.#items.find(it => it.name == name);
	}

	add(item) {
		if (item instanceof BaseObject) {
			if (this.get(item.name)) return;

			if (this.#sortByZ) {
				const i = this.#items.bublleFind(item);
				this.#items.slice(i, 0, item);
			} else {
				this.#items.push(item);
			}

		}
	}
}