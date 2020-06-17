// import { CanvasRender } from "./graphics/canvasRender.js";
// import { KeyMap } from "./inputs/keyMap.js";
// import { KeyboardInput } from "./inputs/keyboardInput.js";
import { IUpdating } from "./gameObjects/common.js";

export class Engine {
	// #settings = null;

	#render = null;

	constructor(settings) {
		// // this.#settings = settings.engine;
		// this.#render = new CanvasRender(
		// 	settings.render.width,
		// 	settings.render.height,
		// 	settings.render.backgroundColor,
		// 	settings.render.scale
		// );
	}

	// #keyBoardInput = new KeyboardInput(new KeyMap([
	// 	{ action: 'moveUp', keys: [KeyMap.KEYS.UP] },
	// 	{ action: 'moveDown', keys: [KeyMap.KEYS.DOWN] },
	// 	{ action: 'moveRight', keys: [KeyMap.KEYS.RIGHT] },
	// 	{ action: 'moveLeft', keys: [KeyMap.KEYS.LEFT] },
	// ]));

	start(objects) {
		// if (!(scene instanceof IUpdating)) return;
		// activeScene.setInput('Pers', this.#keyBoardInput);
		this.#pause = false;
		const _this = this;
		requestAnimationFrame(function render() {
			if (!_this.#pause) {
				// activeScene.update({ render: _this.#render });
				objects.forEach(obj => {
					obj.update();
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