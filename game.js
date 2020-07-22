import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { WalkMan } from "./gameObjects/walkMan.js";
import { KeyboardInput } from "./inputs/keyboardInput.js";
import { KeyMap } from "./inputs/keyMap.js";
import { GrassScene } from "./scenes/grassScene.js";
import { PositionRender } from "./graphics/positionRender.js";
import { Closer } from "./gameObjects/closer.js";
import { Body } from "./gameObjects/bodies.js";
import { ViewPort } from "./gameObjects/viewPort.js";
import { Spawner } from "./gameObjects/spawner.js";
import { WhiteWolker } from "./gameObjects/whiteWolker.js";
import { RndWolk } from "./inputs/rndWolk.js";
import { Ui } from "./gameObjects/ui.js";

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

	const kbInput = new KeyboardInput(
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

	const wm = new WalkMan('WalkMan', 400, 300, kbInput, tiles, render);
	const viewPort = new ViewPort('ViewPort',
		new Closer(wm.body, 0.05, renderBody));

	const ui = new Ui(viewPort.body, render);

	const scene = new GrassScene(render);
	scene.addObject(wm);
	scene.addObject(viewPort);
	scene.addObject(ui);

	// new Spawner(10, () => 2000, (i) => {
	// 	scene.addObject(
	// 		new WhiteWolker(
	// 			"WhiteWolker" + i,
	// 			Math.random() * wm.body.size.x * 2 + wm.body.pos.x - wm.body.size.x,
	// 			Math.random() * wm.body.size.y * 2 + wm.body.pos.y - wm.body.size.y,
	// 			new RndWolk(),
	// 			tiles,
	// 			render
	// 		)
	// 	);
	// }).start();
	scene.addObject(
		new WhiteWolker(
			"WhiteWolker1",
			Math.random() * wm.body.size.x * 2 + wm.body.pos.x - wm.body.size.x,
			Math.random() * wm.body.size.y * 2 + wm.body.pos.y - wm.body.size.y,
			new RndWolk(),
			tiles,
			render
		)
	);
	engine.start(scene);

}, false);
tiles.src = 'tiles.png';