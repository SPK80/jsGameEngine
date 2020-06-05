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
	const order = [0, 1, 2];
	const moveDelay = 100;
	const idleDelay = 1000;
	const animations = {
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
	const render = new CanvasRender(settings.render.width, settings.render.height, 'blue');
	const pers = new Personage('Pers', 10, 100, 32, 32,
		tiles, animations, new State(), render);

	const scene = new Composite([pers], { y: true, z: true },
		new Body(0, 0, tiles.width, tiles.height, new State()));

	// engine.start(scene);
	scene.update();
}, false);

tiles.src = 'tiles.png';