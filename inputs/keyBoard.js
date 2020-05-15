import { InputDevice } from "./inputDevice.js";

export class KeyBoard extends InputDevice {

	#pressedKeys = {};

	#lastUpCode = 0;
	get lastUp() {
		for (key in this.#keys) {
			if (this.#keys[key] == this.#lastUpCode)
				return { key: key, code: this.#lastUpCode };
		}
		return { key: '', code: this.#lastUpCode };
	}

	#lastDownCode = 0;
	get lastDown() {
		for (var key in this.#keys) {
			if (this.#keys[key] == this.#lastDownCode)
				return { key: key, code: this.#lastDownCode };
		}
		return { key: '', code: this.#lastDownCode };
	}

	#keys = {
		'UP': 38,
		'DOWN': 40,
		'LEFT': 37,
		'RIGHT': 39,
		'ESC': 27,
		'ENTER': 13,
	};

	constructor() {
		super()
		const _keyBoard = this;

		window.addEventListener('keydown', e => {
			_keyBoard.#lastDownCode = e.keyCode;
			_keyBoard.#pressedKeys[e.keyCode] = true;
		});

		window.addEventListener('keyup', function (e) {
			_keyBoard.#lastUpCode = e.keyCode;
			_keyBoard.#pressedKeys[e.keyCode] = false;
		});

	}

	isPress(keyName) {
		return this.#pressedKeys[this.#keys[keyName]];
	}
}