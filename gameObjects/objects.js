import { BaseObject } from "./gameObject.js";

export class GameObjects {
	#items = [];

	constructor(items) {
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
			this.#items.push(item);
		}
	}
}