import { InputDevice } from "./inputDevice.js";

export class Mouse extends InputDevice {

	#x = 0;
	get x() { return this.#x; }

	#y = 0;
	get y() { return this.#y; }

	#dx = 0;
	get dx() { return this.#dx; }

	#dy = 0;
	get dy() { return this.#dy; }

	#scale = 1;

	#wereEvents = {};
	wereEvent(eventName, deleteEvent = true) {

		var result = wereEvents[eventName];
		if (result && deleteEvent) {
			this.#wereEvents[eventName] = false;
		}
		return result;
	}

	constructor(scale = 1) {
		super()
		this.#scale = scale;
		//const _this = this;

		var baseEventHandler = function (e, _this) {
			_this.#wereEvents[e.type] = true;
			_this.#x = e.clientX / _this.#scale;
			_this.#y = e.clientY / _this.#scale;
		}

		window.addEventListener('mousemove', e => {
			baseEventHandler(e, this);
			this.#dx = e.movementX / this.#scale;
			this.#dy = e.movementY / this.#scale;
		});


		window.addEventListener('dblclick', e => {
			baseEventHandler(e, this);
		});

		window.addEventListener('click', e => {
			baseEventHandler(e, this);
		});
	}
}