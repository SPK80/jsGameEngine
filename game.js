import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
// import { PacScene } from "./scenes/pacScene.js";
// import { NewScene } from "./scenes/newScene.js";
import { Composite, Body, State } from "./gameObjects/bodies.js";
import { Animation } from "./animations/animation.js";
import { Frame } from "./animations/frame.js";
import { Personage } from "./gameObjects/personage.js";
import { CanvasRender } from "./graphics/renders.js";
import { ImageDrawing, EmptyDrawing } from "./gameObjects/drawings.js";
import { WhiteWolker } from "./gameObjects/whiteWolker.js";

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

	const render = new CanvasRender(settings.render.width, settings.render.height, '');
	const pers = new WhiteWolker('Pers', 500, 100,
		tiles, new State(), render);

	const scene = new Composite([pers], { y: true, z: true },
		new Body(0, 0, tiles.width, tiles.height, new State()));

	// engine.start(scene);
	scene.update();
}, false);

tiles.src = 'tiles.png';