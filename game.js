import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { WalkMan } from "./gameObjects/walkMan.js";
import { KeyboardInput } from "./inputs/keyboardInput.js";
import { KeyMap } from "./inputs/keyMap.js";
import { GrassScene } from "./scenes/grassScene.js";
import { PositionRender } from "./graphics/renderProxy.js";
import { Closer } from "./gameObjects/closer.js";

const settings = new Settings();

const engine = new Engine(settings);

window.onclose = () => {
	console.log('pause', engine);
	engine.pause();

	console.log('save', settings);
	settings.save();
}

const tiles = new Image();
tiles.addEventListener("load", () => {
	const kb = new KeyboardInput(
		new KeyMap([
			{ action: 'moveUp', keys: [KeyMap.KEYS.UP] },
			{ action: 'moveDown', keys: [KeyMap.KEYS.DOWN] },
			{ action: 'moveRight', keys: [KeyMap.KEYS.RIGHT] },
			{ action: 'moveLeft', keys: [KeyMap.KEYS.LEFT] },
		])
	);
	const render = new PositionRender(0, 0,
		new CanvasRender(settings.render.width, settings.render.height, ''));
	const wm = new WalkMan('WalkMan', 100, 100, kb, tiles, render);
	const scene = new GrassScene(render, tiles);
	// const renderCloser = new Closer(render);
	scene.addObject(wm);
	engine.start([scene]);


}, false);
tiles.src = 'tiles.png';