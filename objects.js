export class Objects {
	#items = {};

	constructor(items) {
		items.forEach(it => {
			this.add(it);
		});
	}

	get(name) {
		return this.#items[name];
	}
	add(item) {
		if (!this.get(item.name)) {
			this.#items[item.name] = item;
		}
	}
}