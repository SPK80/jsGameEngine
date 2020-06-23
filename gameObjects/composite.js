import { DrawingDecorator } from "./drawings.js";
import { throwIfNotInstance } from "../tools/utils.js";
import { IGameObject } from "./common.js";

class Composite extends DrawingDecorator {
	#items = [];
	constructor(items, object) {
		super(object);
		items.forEach((it) => {
			if (it instanceof IGameObject) {
				if (this.get(it.name)) return;
				this.#items.push(it);
			}
		});
	}

	get(name) {
		if (name == undefined) {
			return this.#items;
		} else return this.#items.find((it) => it.name == name);
	}

	add(item) {
		if (item instanceof IGameObject) {
			if (this.get(item.name)) return;
			this.#items.push(item);
		}
	}

	remove(item) {
		if (item instanceof IGameObject) {
			const i = this.#items.indexOf(item);
			if (i >= 0) delete this.#items[i];
		} else if (typeof item == "string") {
			remove(this.get(item.name));
		}
	}

	_updateAll() {
		this.get().forEach((item) => {
			item.update();
		});
	}

	update() {
		super.update();
		this._updateAll();
	}
}

export class SortingComposite extends Composite {
	#sortedZ = false;
	constructor(items, object) {
		super(items, object);
	}

	_updateAll() {
		this.get()
			.sort((a, b) => a.body.pos.y - b.body.pos.y)
			.forEach((item) => {
				item.update();
			});
	}

	get(name) {
		if (name == undefined) {
			if (!this.#sortedZ) {
				//console.log('sort', this.#sortedZ);

				super.get().sort((a, b) => a.body.pos.z - b.body.pos.z);
				this.#sortedZ = true;
			}
			return super.get();
		} else return super.get(name);
	}

	add(item) {
		super.add(item);
		this.#sortedZ = false;
		//console.log(`add ${item.name}`, this);
	}
}

// class Interactor {
// 	interact(object) {
// 		throw ('interact must be implemented');
// 	}
// }

export class InteractComposite extends SortingComposite {
	constructor(items, object) {
		super(items, object);
	}

	update() {
		super.update();
		super.get().forEach((item) => {
			item.interact();
		});
	}
}
