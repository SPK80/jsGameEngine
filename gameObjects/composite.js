import { IGameObject, IComposite } from "./common.js";
import { throwIfNotInstance } from "../tools/utils.js";

export class Composite extends IComposite {
	#items = [];

	constructor(items) {
		super();
		items.forEach((it) => {
			if (it instanceof IGameObject) {
				if (this.get(it.name))
					return;
				this.#items.push(it);
			}
		});
	}

	get(name) {
		if (name == undefined) {
			return this.#items;
		}
		else
			return this.#items.find((it) => it.name == name);
	}

	add(item) {
		if (item instanceof IGameObject) {
			if (this.get(item.name))
				return;
			this.#items.push(item);
		}
	}

	remove(item) {
		if (item instanceof IGameObject) {
			const i = this.#items.indexOf(item);
			if (i >= 0)
				delete this.#items[i];
		}
		else if (typeof item == "string") {
			remove(this.get(item.name));
		}
	}

	update() {
		this.#items.forEach((item) => {
			item.update();
		});
	}
}

export class CompositeDecorator extends IComposite {
	#object;
	add(item) { return this.#object.add(item) };
	get(name) { return this.#object.get(name) };
	remove(item) { return this.#object.remove(item) };
	update() { this.#object.update(); }

	constructor(object) {
		super();
		this.#object = throwIfNotInstance(object, IComposite);
	}
}

export class SortingComposite extends CompositeDecorator {
	#sortedZ = false;

	update() {
		this.get()
			.sort((a, b) => a.body.pos.y - b.body.pos.y)
			.forEach((item) => {
				item.update();
			});
	}

	get(name) {
		if (name == undefined) {
			const items = super.get();
			if (!this.#sortedZ) {
				items.sort((a, b) => a.body.pos.z - b.body.pos.z);
				this.#sortedZ = true;
			}
			return items;
		}
		else super.get(name);
	}

	add(item) {
		const items = super.get();
		// console.log(items);
		items.push(item);
		this.#sortedZ = false;
	}
}

export class ResistantComposite extends CompositeDecorator {
	#resistance;
	get resistance() {
		return this.#resistance;
	}
	set resistance(value) {
		this.#resistance = value;
		this.#factor = 1 / (1 + value);
	}

	#factor = 1;
	#minSpeed = 0.01;

	constructor(resistance, object) {
		super(object);
		this.resistance = resistance;
	}

	update() {
		super.update();
		this.get().forEach((item) => {
			const v = item.body.velocity;
			if (v) {
				if (v.length > this.#minSpeed)
					v.scMul(this.#factor);
				else v.sub(v);
			}
		});
	}
}