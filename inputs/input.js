import { KeyMap } from "./keyMap.js";

export class Input {
	get() { throw ('get must be implemented') }
}

export class KeyBoardInput extends Input {

	#actions = [];
	#keyMap = null;

	constructor(keyMap) {
		super();
		if (keyMap instanceof KeyMap)
			this.#keyMap = keyMap;

		window.addEventListener('keydown', e => {
			const act = this.#keyMap.get(e.keyCode);
			if (act && !this.#actions.includes(act))
				this.#actions.push(act);
			console.log('keydown ', e.keyCode, this.#actions);
		});

		window.addEventListener('keyup', e => {
			const actions = [];
			for (let i = 0; i < this.#actions.length; i++) {
				const action = this.#actions[i];
				if (action != this.#keyMap.get(e.keyCode))
					actions.push(action);
			}
			this.#actions = actions;
			console.log('keyup ', e.keyCode, this.#actions);
		});
	}

	get() {
		return this.#actions;
	}
}


// export class AltKeyBoardInput extends Input {

// 	#pressedKeys = new PressedKeys();
// 	#keyMap = null;

// 	constructor(keyMap) {
// 		super();
// 		if (keyMap instanceof KeyMap)
// 			this.#keyMap = keyMap;

// 		window.addEventListener('keydown', e => {
// 			this.#pressedKeys.add(e.keyCode);
// 		});

// 		window.addEventListener('keyup', e => {
// 			this.#pressedKeys.remove(e.keyCode);
// 		});
// 	}

// 	get() {
// 		const actions = [];
// 		this.#pressedKeys.items.forEach(key => {
// 			const act = this.#keyMap.get(key);
// 			if (act)
// 				actions.push(act);
// 		});
// 		return actions;
// 	}
// }


// export class PressedKeys {
// 	#items = [];
// 	add(key) {
// 		if (!this.#items.includes(key))
// 			this.#items.push(key);
// 	}

// 	remove(key) {
// 		const items = [];
// 		for (let i = 0; i < this.#items.length; i++) {
// 			const item = this.#items[i];
// 			if (item != key) items.push(item);
// 		}
// 		this.#items = items;
// 	}

// 	get(key) {
// 		return this.#items.includes(key);
// 	}

// 	get items() {
// 		return this.#items;
// 	}
// }