import { BaseObject } from "./gameObject.js";
import { bublleFindIndex } from "../tools/bublleFind.js";

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

				const index = bublleFindIndex(item.z, this.#items.length,
					(i) => this.#items[i].z);

				this.#items.splice(index, 0, item);
				// console.log(this.#items);

			} else {
				this.#items.push(item);
			}

		}
	}
}