export class KeyMap {
	#items = {};

	constructor(kmaps) {
		kmaps.forEach(kmap => {
			this.add(kmap.action, kmap.keys);
		});
	}
	
	add(action, keys) {
		this.#items[action] = [];
		keys.forEach(key => {
			this.#items[action].push(key);
		});
	}

	get(key) {
		for (const action in this.#items) {
			if (this.#items.hasOwnProperty(action)) {
				const keys = this.#items[action];
				if (keys.includes(key))
					return action;
			}
		}
	}

	static KEYS = {
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		ESC: 27,
		ENTER: 13,
		MOUSE_LEFT: 1,
		MOUSE_RIGHT: 2,
		MOUSE_MIDLE: 3,
	};
}