import { FifoChain } from "../chains";

export class InputDriver {

	#commands = new FifoChain();
	get _commands() {
		return this.#commands;
	}
	pop() {
		return this.#commands.get();
	}
}

class KeyBoardInput extends InputDriver {
	#pressedKeys = [];

	#keys = {
		'UP': 38,
		'DOWN': 40,
		'LEFT': 37,
		'RIGHT': 39,
		'ESC': 27,
		'ENTER': 13,
		'MOUSE_LEFT': 1,
		'MOUSE_RIGHT': 2,
		'MOUSE_MIDLE': 3,
	};

	#keyMap = new KeyMap();

	constructor() {
		window.addEventListener('keydown', e => {
			this.#pressedKeys[e.keyCode] = true;
			const action = this.#keyMap.get(e.keyCode);
			this.commands.add(action);
		});

		window.addEventListener('keyup', e => {
			this.#pressedKeys[e.keyCode] = false;
		});
	}

	keyPressed(key) {
		if (typeof (key) == 'number')
			return this.#pressedKeys[key];
		else if (typeof (key) == 'string')
			return this.#pressedKeys[this.#keys[key]];
		else return undefined;
	}
}

class KeyMap {
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