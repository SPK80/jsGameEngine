import { Settings } from "./settings.js";
import { TestScene } from "./scenes/testScene.js";
import { RenderEngine } from "./engines/RenderEngine.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { loadImage } from "./graphics/image.js";
import { KeyboardInput } from "./inputs/keyboardInput.js";

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

	const keyboardInput = new KeyboardInput();

	const renderEngine = new RenderEngine(canvasRender);
	const scene = new TestScene(renderEngine, keyboardInput);
	renderEngine.start();
	// keyboardInput.start();
})()