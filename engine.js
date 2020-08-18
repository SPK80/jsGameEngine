export class Engine {	
	#frameDelay;
	get frameDelay() { return this.#frameDelay }

	constructor(settings) {
		this.#frameDelay = 1000 / settings.engine.frameRate;

	}

	start(scene) {
		this.#pause = false;
		const _this = this;
	
		setInterval(
			() => {
				if (!_this.#pause) {
					scene.update();
				}

			}, this.#frameDelay);
	}

	#pause = false;
	pause() {
		this.#pause = true;
	}
	resume() {
		this.#pause = false;
	}
}