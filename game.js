import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { KeyboardInput, InputMapper } from "./inputs/keyboardInput.js";
import { KeyMap } from "./inputs/keyMap.js";
import { GrassScene } from "./scenes/grassScene.js";
import { PositionRender } from "./graphics/positionRender.js";
import { Body } from "./gameObjects/bodies/bodies.js";

const settings = new Settings();
const engine = new Engine(settings);

window.onclose = () => {
	console.log('pause', engine);
	engine.pause();

	console.log('save', settings);
	settings.save();
}

export const tiles = new Image();
tiles.addEventListener("load", () => {

	const keyMap = new KeyMap([
		{ action: 'moveUp', keys: [KeyMap.KEYS.UP] },
		{ action: 'moveDown', keys: [KeyMap.KEYS.DOWN] },
		{ action: 'moveRight', keys: [KeyMap.KEYS.RIGHT] },
		{ action: 'moveLeft', keys: [KeyMap.KEYS.LEFT] },
	]);

	const input = new InputMapper(new KeyboardInput(), (key) => keyMap.get(key));

	input.subscribe((args) => console.log(...args));

	const render = new PositionRender(
		new Body(0, 0, 0, settings.render.width, settings.render.height),
		new CanvasRender(settings.render.width, settings.render.height, ''));

	const scene = new GrassScene(render, input, tiles);

	engine.start(scene);
	// scene.update()
}, false);
tiles.src = 'tiles.png';