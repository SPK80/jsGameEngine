import { GameObject } from "./gameObject.js";
import { bublleFindIndex } from "../tools/bublleFind.js";
import { throwIfNotInstance } from "../tools/utils.js";

export class GameObjects {
	#items = [];
	#sortByZ = true;
	#sortByY = true;

	constructor(items, sortBy) {
		if (sortBy) {
			this.#sortByZ = sortBy.z ? true : false;
			this.#sortByY = sortBy.y ? true : false;
		}
		items.forEach(it => {
			throwIfNotInstance(it, GameObject)
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
		if (item instanceof GameObject) {
			if (this.get(item.name)) return;
			if (this.#sortByZ) {
				const index = bublleFindIndex(item.z, this.#items.length,
					(i) => this.#items[i].z);
				this.#items.splice(index, 0, item);
			} else this.#items.push(item);
		}
	}

	remove(item) {
		if (item instanceof GameObject) {
			const i = this.#items.indexOf(item);
			if (i >= 0) delete this.#items[i];
		}
		else if (typeof (item) == 'string') {
			remove(this.get(item.name));
		}
	}
}