// import { InputDriver } from "./inputs/input.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { KeyMap } from "./inputs/keyMap.js";
import { KeyBoardInput } from "./inputs/input.js";
// import { GameObjects } from "./objects.js";

export class Engine {
	// #settings = null;
	// #input = null;
	// #scenes = null;
	#render = null;

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

		// this.#input = new InputDriver(true, false);
		// this.#scenes = new Objects(scenes);
	}

	#keyBoardInput = new KeyBoardInput(new KeyMap([
		{ action: 'moveForward', keys: [KeyMap.KEYS.UP] },
		{ action: 'moveBack', keys: [KeyMap.KEYS.DOWN] },
		{ action: 'turnRight', keys: [KeyMap.KEYS.RIGHT] },
		{ action: 'turnLeft', keys: [KeyMap.KEYS.LEFT] },
	]));

	start(activeScene) {
		console.log(this.#keyBoardInput);

		activeScene.setInput('Pacman', this.#keyBoardInput);

		// const activeScene = this.#scenes.get(sceneName);
		// console.log(sceneName);
		// activeScene.init({
		// 	render: this.#render,
		// 	input: this.#input,
		// 	// phisics: _this.#phisics,
		// 	// sound : soundDriver,
		// });
		this.#pause = false;
		const _this = this;

		requestAnimationFrame(function render() {
			if (!_this.#pause) {
				// console.log(_this.#keyBoardInput);

				activeScene.update({ render: _this.#render });
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