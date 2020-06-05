import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
// import { PacScene } from "./scenes/pacScene.js";
// import { NewScene } from "./scenes/newScene.js";
import { Body, State } from "./gameObjects/bodies.js";
import { Animation } from "./animations/animation.js";
import { Frame } from "./animations/frame.js";
import { Personage } from "./gameObjects/personage.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { ImageDrawing, EmptyDrawing } from "./gameObjects/drawings.js";
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

	engine.start(scene);
	// scene.update();
}, false);

tiles.src = 'tiles.png';