export class Objects {
	#items = {};

	constructor(items) {
		items.forEach(it => {
			this.add(it);
		});
	}

	get(name) {
		if (name == undefined)
			return this.#items;
		else
			return this.#items[name];
	}

	add(item) {
		if (!this.get(item.name)) {
			this.#items[item.name] = item;
		}
	}

}