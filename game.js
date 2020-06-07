import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
// import { PacScene } from "./scenes/pacScene.js";
// import { NewScene } from "./scenes/newScene.js";
import { Body, Moving } from "./gameObjects/bodies.js";
import { State } from "./gameObjects/state.js";
import { Animation } from "./animations/animation.js";
import { Frame } from "./animations/frame.js";
import { Personage } from "./gameObjects/personage.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { ImageDrawing, EmptyDrawing, ClearDrawing, AnimDrawing } from "./gameObjects/drawings.js";
import { WhiteWolker } from "./gameObjects/whiteWolker.js";
import { Composite } from "./gameObjects/composite.js";
import { WalkMan } from "./gameObjects/walkMan.js";
import { KeyboardInput } from "./inputs/keyboardInput.js";
import { KeyMap } from "./inputs/keyMap.js";

const settings = new Settings();

const engine = new Engine(settings);

window.onclose = () => {
	console.log('pause', engine);
	engine.pause();

	console.log('save', settings);
	settings.save();
}

const tiles = new Image();
tiles.addEventListener("load", function () {
	// const pacScene = new NewScene('New scene', undefined, tiles);
	const kb = new KeyboardInput(
		new KeyMap([
			{ action: 'moveUp', keys: [KeyMap.KEYS.UP] },
			{ action: 'moveDown', keys: [KeyMap.KEYS.DOWN] },
			{ action: 'moveRight', keys: [KeyMap.KEYS.RIGHT] },
			{ action: 'moveLeft', keys: [KeyMap.KEYS.LEFT] },
		])
	);
	const render = new CanvasRender(settings.render.width, settings.render.height, '');
	const ww = new WhiteWolker('WhiteWolker', 500, 100,
		tiles, new State(), render);
	const wm = new WalkMan('WalkMan', 500, 200,
		tiles, kb, render);

	const scene = new ImageDrawing(tiles,
		new Composite([ww, wm], { y: true, z: true },
			new EmptyDrawing(render,
				new Body(0, 0, tiles.width, tiles.height,
					new State()))));


	const order = [0, 1, 2];
	const moveDelay = 100;
	const idleDelay = 1000;
	const anims = {
		moveRight: new Animation([
			new Frame(0 * 32, 10 * 32, 32, 32, moveDelay),
			new Frame(1 * 32, 10 * 32, 32, 32, moveDelay),
			new Frame(2 * 32, 10 * 32, 32, 32, moveDelay)
		], order, true),
		moveLeft: new Animation([
			new Frame(0 * 32, 9 * 32, 32, 32, moveDelay),
			new Frame(1 * 32, 9 * 32, 32, 32, moveDelay),
			new Frame(2 * 32, 9 * 32, 32, 32, moveDelay)
		], order, true),
		moveDown: new Animation([
			new Frame(0 * 32, 8 * 32, 32, 32, moveDelay),
			new Frame(1 * 32, 8 * 32, 32, 32, moveDelay),
			new Frame(2 * 32, 8 * 32, 32, 32, moveDelay)
		], order, true),
		moveUp: new Animation([
			new Frame(0 * 32, 11 * 32, 32, 32, moveDelay),
			new Frame(1 * 32, 11 * 32, 32, 32, moveDelay),
			new Frame(2 * 32, 11 * 32, 32, 32, moveDelay)
		], order, true),
		idle: new Animation([
			new Frame(0 * 32, 8 * 32, 32, 32, idleDelay),
			new Frame(0 * 32, 9 * 32, 32, 32, idleDelay),
			new Frame(0 * 32, 10 * 32, 32, 32, idleDelay),
			new Frame(0 * 32, 11 * 32, 32, 32, idleDelay)
		], [0, 1, 2, 3], true),
	};

	const mb = new AnimDrawing(tiles, anims,
		new ClearDrawing(
			new EmptyDrawing(render,
				new Moving(kb,
					new Body(100, 100, 32, 32)))));

	engine.start(mb);
	// scene.update();
}, false);

tiles.src = 'tiles.png';