import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { WalkMan } from "./gameObjects/walkMan.js";
import { KeyboardInput } from "./inputs/keyboardInput.js";
import { KeyMap } from "./inputs/keyMap.js";
import { GrassScene } from "./scenes/grassScene.js";
import { PositionRender } from "./graphics/positionRender.js";
import { ViewPort } from "./gameObjects/viewPort.js";
import { Spawner } from "./gameObjects/spawner.js";
import { WhiteWolker } from "./gameObjects/whiteWolker.js";
import { RndWolk } from "./inputs/rndWolk.js";
import { Ui } from "./gameObjects/ui.js";
import { BodyCloser } from "./gameObjects/bodies/bodyCloser.js";
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

	const kbInput = new KeyboardInput(
		new KeyMap([
			{ action: 'moveUp', keys: [KeyMap.KEYS.UP] },
			{ action: 'moveDown', keys: [KeyMap.KEYS.DOWN] },
			{ action: 'moveRight', keys: [KeyMap.KEYS.RIGHT] },
			{ action: 'moveLeft', keys: [KeyMap.KEYS.LEFT] },
		])
	);

	const render = new PositionRender(
		new Body(0, 0, 0, settings.render.width, settings.render.height),
		new CanvasRender(settings.render.width, settings.render.height, ''));

	const scene = new GrassScene(render, kbInput, tiles);

	engine.start(scene);
	// scene.update()

}, false);
tiles.src = 'tiles.png';