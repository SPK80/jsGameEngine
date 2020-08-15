import { ISource, Input } from "./input.js";
import { GameEvent } from "../gameObjects/events/gameEvent.js";

export class KeyboardInput extends Input {

	#keys = [];
	#onUpdate = new GameEvent('InputUpdate');

	subscribe(callback) {
		this.#onUpdate.subscribe(callback);
	}

	constructor() {
		super('KeyboardInput');

		window.addEventListener('keydown', e => {
			const key = e.keyCode;
			if (key && !this.#keys.includes(key))
				this.#keys.push(key);

			this.#onUpdate.call(['keydown', e.keyCode]);
		});

		window.addEventListener('keyup', e => {
			const newKeys = [];
			for (let i = 0;i < this.#keys.length;i++) {
				const key = this.#keys[i];
				if (key != e.keyCode)
					newKeys.push(key);
			}
			this.#keys = newKeys;
			this.#onUpdate.call(['keyup', e.keyCode]);
		});
	}

	get() {
		return this.#keys;
	}
}

export class InputMapper extends ISource {
	#mapper = () => this.#input.get();
	#input;

	constructor(input, mapper) {
		super();
		this.#input = input;
		this.#mapper = mapper;
	}

	get() {
		const inp = this.#input.get();
		return inp.map(this.#mapper);
	}

	subscribe(callback) {
		this.#input.subscribe(callback);
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