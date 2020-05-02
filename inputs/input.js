import { KeyMap } from "./keyMap.js";

export class Input {
	get() { throw ('get must be implemented') }
}

export class KeyBoardInput extends Input {

	#pressedKeys = new PressedKeys();
	#keyMap = null;

	constructor(keyMap) {
		super();
		if (keyMap instanceof KeyMap)
			this.#keyMap = keyMap;

		window.addEventListener('keydown', e => {
			this.#pressedKeys.add(e.keyCode);
		});

		window.addEventListener('keyup', e => {
			// console.log(e.keyCode);
			// console.log(this.#pressedKeys);

			this.#pressedKeys.remove(e.keyCode);
			// console.log(this.#pressedKeys);
		});
	}

	get() {
		const actions = [];
		this.#pressedKeys.items.forEach(key => {
			const act = this.#keyMap.get(key);
			if (act)
				actions.push(act);
		});
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

export class PressedKeys {
	#items = [];
	add(key) {
		if (!this.#items.includes(key))
			this.#items.push(key);
	}

	remove(key) {
		const i = this.#items.indexOf(key);
		// console.log(i, key, this.#items);

		delete this.#items[i];
		const items = [];
		this.#items.forEach(it => {
			this.#items.push(it);
		});
		// console.log(items);
		this.#items = items;
	}

	get(key) {
		return this.#items.includes(key);
	}

	get items() {
		return this.#items;
	}
}