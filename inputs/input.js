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
			console.log(e.keyCode);
			console.log(this.#pressedKeys);
			this.#pressedKeys.remove(e.keyCode);
			console.log(this.#pressedKeys);

		});
	}

	get() {
		const actions = [];
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