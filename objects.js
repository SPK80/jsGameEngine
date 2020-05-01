import { BaseObject } from "./gameObjects/gameObject.js";

export class GameObjects {
	#items = [];

	constructor(items) {
		items.forEach(it => {
			this.push(it);
		});
	}

	get(name) {
		if (name == undefined)
			return this.#items;
		else
			return this.#items.find(it => it.name == name);
	}

	push(item) {
		if (item instanceof BaseObject) {
			if (this.get(item.name)) return;
			this.#items.push(item);
		}
	}
}