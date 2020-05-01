import { InputDriver } from "./inputs/inputDriver.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { Objects } from "./objects.js";

export class Engine {
	// #settings = null;
	#render = null;
	#input = null;
	// #scenes = null;

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
		// this.#scenes = new Objects(scenes);
	}

	start(activeScene) {

		// const activeScene = this.#scenes.get(sceneName);
		// console.log(sceneName);

		// activeScene.init({
		// 	render: this.#render,
		// 	input: this.#input,
		// 	// phisics: _this.#phisics,
		// 	// sound : soundDriver,
		// });

		const _this = this;
		this.#pause = false;
		requestAnimationFrame(function render() {
			if (!_this.#pause) {
				activeScene.update();
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