export class Spawner {

	#count = 0;
	#getInterval;
	#createObject;

	constructor(startCount, getInterval, createObject) {
		this.#count += startCount;
		this.#getInterval = getInterval;
		this.#createObject = createObject;
	}

	#timer;

	start() {
		this.stop();
		const loop = () => {
			this.#timer = setTimeout(loop, this.#getInterval());
			this.#count++;
			this.#createObject(this.#count);
		};
		loop();
	}

	stop() {
		if (this.#timer) {
			clearTimeout(this.#timer);
		}
	}
}