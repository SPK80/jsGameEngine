import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { WalkMan } from "./gameObjects/walkMan.js";
import { KeyboardInput } from "./inputs/keyboardInput.js";
import { KeyMap } from "./inputs/keyMap.js";
import { GrassScene } from "./scenes/grassScene.js";
import { PositionRender } from "./graphics/renderProxy.js";
import { Closer } from "./gameObjects/closer.js";
import { Vector2 } from "./geometry/vectors.js";
import { Moving, Body } from "./gameObjects/bodies.js";

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
	const renderBody = new Body(0, 0, 0, settings.render.width, settings.render.height);
	const render = new PositionRender(renderBody,
		new CanvasRender(settings.render.width, settings.render.height, ''));

	const wm = new WalkMan('WalkMan', 100, 100, kb, tiles, render);

	const closer = new Closer(renderBody, wm.body, 0.05);

	const scene = new GrassScene(render, tiles);

	scene.addObject(wm);
	engine.start([scene, closer]);

}, false);
tiles.src = 'tiles.png';