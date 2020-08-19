
export class KeyboardDriver {
	#buffer = [];

	constructor() {
		window.addEventListener('keydown', e => {
			if (!this.#buffer.includes(e.keyCode))
				this.#buffer.push(e.keyCode);
		});

		window.addEventListener('keyup', e => {
			const i = this.#buffer.indexOf(e.keyCode);
			if (i >= 0)
				this.#buffer.splice(i, 1);
			//delete this.#buffer[i];
		});
	}

	get() {
		return this.#buffer.slice();
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
