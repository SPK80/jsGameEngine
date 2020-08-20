import { Settings } from "./settings.js";
import { loadImage } from "./image.js";
import { TestScene } from "./scenes/testScene";
import { RenderEngine, InputEngine } from "./engines/RenderEngine.js";
import { TaskInput } from "./inputs/TaskInput";
import { CanvasRender } from "./graphics/canvasRender.js";
import { KeyboardDriver } from "./inputs/keyboardDriver.js";

(async function game() {

	const settings = new Settings();

	window.onclose = () => {
		console.log('pause', engine);
		engine.pause();

		console.log('save', settings);
		settings.save();
	}


	// try {
	const tiles = await loadImage('tiles.png');
	console.log(tiles);
	// } catch (error) {
	// 	console.error(error)
	// }

	const canvasRender = new CanvasRender(
		settings.render.width,
		settings.render.height,
		settings.render.backgroundColor,
		settings.render.scale);

	const keyboard = new KeyboardDriver();
	const inputEngine = new InputEngine(keyboard);

	const renderEngine = new RenderEngine(canvasRender);
	const scene = new TestScene(renderEngine, inputEngine);
	renderEngine.start();
	inputEngine.start();
})()