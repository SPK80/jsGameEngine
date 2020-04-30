import { InputDriver } from "./inputs/inputDriver.js";
import { CanvasRender } from "./graphics/canvasRender.js";

class Scenes {
	#items = {};
	get(name) {
		return this.#items[name];
	}
	add(scene) {
		if (!this.get(scene.name)) {
			this.#items[scene.name] = scene;
		}
	}
}

export class Engine {
	// #settings = null;
	#render = null;
	#input = null;
	#scenes = new Scenes();

	constructor(settings, scenes) {
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

		scenes.forEach(s => {
			this.#scenes.add(s);
		});

	}

	start(sceneName) {

		const activeScene = this.#scenes.get(sceneName);
		activeScene.init({
			render: this.#render,
			input: this.#input,
			// phisics: _this.#phisics,
			// sound : soundDriver,
		});

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