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
import { SortingRender } from "./graphics/renderProxy.js";
import { throwIfNotInstance } from "./tools/utils.js";
import { AbstractRender } from "./graphics/AbstractRender.js";
import { Scene } from "./scenes/scene.js";
import { RndWolk, Stand } from "./inputs/rndWolk.js";

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

	const kb = new KeyboardInput(
		new KeyMap([
			{ action: 'moveUp', keys: [KeyMap.KEYS.UP] },
			{ action: 'moveDown', keys: [KeyMap.KEYS.DOWN] },
			{ action: 'moveRight', keys: [KeyMap.KEYS.RIGHT] },
			{ action: 'moveLeft', keys: [KeyMap.KEYS.LEFT] },
		])
	);
	const render = new CanvasRender(settings.render.width, settings.render.height, '');

	const wm = new WalkMan('WalkMan', 100, 100, kb, tiles, render);
	
	const grass = new Image();
	grass.addEventListener("load", function () {
		const ls = new ImageDrawing(grass,
			new EmptyDrawing(render,
				new Body(0, 0, 0, grass.width, grass.height)));
				
				const scene = new Scene([wm], ls, tiles, render);

	for (let i = 0; i < 9; i++) {
		const ww = new WhiteWolker('WhiteWolker' + i,
			Math.random() * settings.render.width,
			Math.random() * settings.render.height,
			new RndWolk(), tiles, render);
		scene.addObject(ww);

	}

	engine.start(scene);
	});
	grass.src = 'grass.jpg';
	

	

}, false);

tiles.src = 'tiles.png';