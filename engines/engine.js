export class IDriverEngine {
	get interface() { throw ('get driver must be implemented') }
	setCallback(callback) { throw ('setCallback must be implemented') }
}

export class DriverEngine extends IDriverEngine {
	#frameTime;
	// get frameTime() { return this.#frameTime }

	#driver;
	get interface() { return this.#driver; }

	#callback = () => { };

	setCallback(callback) {
		if (!callback) throw ('callback undifined!');
		this.#callback = callback;
	}

	constructor(driver, frameTime) {
		super();
		this.#driver = driver;
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