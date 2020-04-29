import { InputDriver } from "./inputs/inputDriver.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { Scene } from "./scenes/scene.js";

export class Engine {
	// #settings = null;
	#render = null;
	#input = null;

	constructor(settings) {
		// this.#settings = settings.engine;
		// this.#keyBoard = new KeyBoard();
		// this.#mouse = new Mouse(this.settings.render.scale);

		this.#render = new CanvasRender(
			settings.render.width,
			settings.render.height,
			settings.render.backgroundColor,
			settings.render.scale
		);

		this.#input = new InputDriver(true, false);
	}

	start(scene) {
		if (!(scene instanceof Scene)) throw (`${scene} is not Scene`);

		const _this = this;
		this.#pause = false;
		requestAnimationFrame(function render() {
			if (!_this.#pause) {
				scene.update({
					render: _this.#render,
					input: _this.#input,
					// phisics: _this.#phisics,
					// sound : soundDriver,
				});
			}
			requestAnimationFrame(render);
		});
	}

	#pause = false;
	pause() {
		this.#pause = true;
	}

	resume() {
		this.#pause = false;
	}
}