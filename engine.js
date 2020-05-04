import { CanvasRender } from "./graphics/canvasRender.js";
import { KeyMap } from "./inputs/keyMap.js";
import { KeyboardInput } from "./inputs/keyboardInput.js";

export class Engine {
	// #settings = null;

	#render = null;

	constructor(settings) {
		// this.#settings = settings.engine;
		this.#render = new CanvasRender(
			settings.render.width,
			settings.render.height,
			settings.render.backgroundColor,
			settings.render.scale
		);
	}

	#keyBoardInput = new KeyboardInput(new KeyMap([
		{ action: 'moveForward', keys: [KeyMap.KEYS.UP] },
		{ action: 'moveBack', keys: [KeyMap.KEYS.DOWN] },
		{ action: 'turnRight', keys: [KeyMap.KEYS.RIGHT] },
		{ action: 'turnLeft', keys: [KeyMap.KEYS.LEFT] },
	]));

	start(activeScene) {

		activeScene.setInput('Pacman', this.#keyBoardInput);

		this.#pause = false;
		const _this = this;

		requestAnimationFrame(function render() {
			if (!_this.#pause) {
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