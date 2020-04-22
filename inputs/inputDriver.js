export class InputDriver {

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

	#pressedKeys = [];

	constructor(listenKeyBoard, listenMouse) {
		if (listenKeyBoard) {
			window.addEventListener('keydown', e => {
				this.#pressedKeys[e.keyCode] = true;
			});

			window.addEventListener('keyup', e => {
				this.#pressedKeys[e.keyCode] = false;
			});
		}
		if (listenMouse) {

		}
	}

	keyPressed(key) {
		if (typeof (key) == 'number')
			return this.#pressedKeys[key];
		else if (typeof (key) == 'string')
			return this.#pressedKeys[this.#keys[key]];
		else return undefined;
	}


}