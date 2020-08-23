// import { Input } from "./input.js";
// import { KeyMap } from "./keyMap.js";
// import { KeyboardDriver } from "./keyboardDriver.js";
import { IInput } from "../gameObjects/common.js";
import { GameEvent } from "../events/event.js";
import { KeyboardDriver } from "./keyboardDriver.js";

// export class InputEngine extends DriverEngine {
// 	constructor(driver, frameRate = 10) {
// 		super(driver, 1000 / frameRate);
// 	}
// }

// export class KeyboardEngine extends InputEngine {
// 	constructor(frameRate = 10) {
// 		super(new KeyboardDriver(), 1000 / frameRate);
// 	}
// }

export class KeyboardInput extends IInput {
	#event = new GameEvent();
	#keyb = new KeyboardDriver((name, data) => this.#event.call(name, data));

	getData() {
		return this.#keyb.get();
	}

	listen(callback) {
		this.#event.subscribe(callback);
	}
}

// export class KeyboardInput extends Input {

// 	#actions = [];
// 	#keyMap = null;

// 	constructor(keyMap) {
// 		super();
// 		if (keyMap instanceof KeyMap)
// 			this.#keyMap = keyMap;

// 		window.addEventListener('keydown', e => {
// 			const act = this.#keyMap.get(e.keyCode);
// 			// console.log(act);

// 			if (act && !this.#actions.includes(act))
// 				this.#actions.push(act);
// 		});

// 		window.addEventListener('keyup', e => {
// 			const actions = [];
// 			for (let i = 0; i < this.#actions.length; i++) {
// 				const action = this.#actions[i];
// 				if (action != this.#keyMap.get(e.keyCode))
// 					actions.push(action);
// 			}
// 			this.#actions = actions;
// 		});
// 	}

// 	get() {
// 		// console.log(this.#actions);
// 		return this.#actions;
// 	}
// }


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