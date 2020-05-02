export class Input {

	// #commands = new FifoChain();
	// get _commands() {
	// 	return this.#commands;
	// }

	get() {
		throw ('get must be implemented')
		// return this.#commands.get();
	}
	// getAll() {
	// 	return this.#commands.toArray();
	// }
}

export class KeyBoardInput extends Input {
	#pressedKeys = new PressedKeys();

	// #keys = {
	// 	'UP': 38,
	// 	'DOWN': 40,
	// 	'LEFT': 37,
	// 	'RIGHT': 39,
	// 	'ESC': 27,
	// 	'ENTER': 13,
	// 	'MOUSE_LEFT': 1,
	// 	'MOUSE_RIGHT': 2,
	// 	'MOUSE_MIDLE': 3,
	// };
	constructor(keyMap) {
		if (keyMap instanceof KeyMap)
			this.#keyMap = keyMap;
	}

	#keyMap = null;//new KeyMap();

	constructor() {
		window.addEventListener('keydown', e => {
			// this.#pressedKeys[e.keyCode] = true;
			this.#pressedKeys.add(e.keyCode);
		});

		window.addEventListener('keyup', e => {
			this.#pressedKeys.remove(e.keyCode);
			// this.#pressedKeys[e.keyCode] = false;
		});
	}

	get() {
		actions = [];
		this.#pressedKeys.items.forEach(key => actions.push(this.#keyMap.get(key)));
		return actions;
	}

	// keyPressed(key) {
	// 	if (typeof (key) == 'number')
	// 		return this.#pressedKeys[key];
	// 	else if (typeof (key) == 'string')
	// 		return this.#pressedKeys[this.#keys[key]];
	// 	else return undefined;
	// }
}
class PressedKeys {
	#items = [];
	add(key) {
		if (!this.#items.includes(key))
			this.#items.push(key);
	}
	remove(key) {
		delete this.#items[key];
	}

	get(key) {
		return this.#items.includes(key);
	}

	get items() {
		return this.#items;
	}
}

export class KeyMap {
	#items = {};
	add(acion, keys) {
		this.#items[acion] = [];
		keys.forEach(key => {
			this.#items[acion].push(key);
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
}