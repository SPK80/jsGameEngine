// import { IDriverEngine } from "../gameObjects/common.js";

export class Engine {
	#frameTime;
	// get frameTime() { return this.#frameTime }

	// #driver;
	// get interface() { return this.#driver; }

	#callback = () => { };

	// listen(callback) {
	// 	if (!callback) throw ('callback undifined!');
	// 	this.#callback = callback;
	// }

	constructor(frameTime, callback) {
		// super();
		// this.#driver = driver;
		this.#callback = callback;
		this.#frameTime = frameTime;
	}

	#timer;

	start() {
		// console.log(this);
		this.#timer = setInterval(this.#callback, this.#frameTime);
	}

	stop() {
		clearInterval(this.#timer);
	}
}