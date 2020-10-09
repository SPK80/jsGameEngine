import { Settings } from "./settings.js";
import { TestScene } from "./scenes/testScene.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { loadImage } from "./graphics/image.js";
import { KeyboardInput } from "./inputs/keyboardInput.js";
import { Engine } from "./engines/engine.js";

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
	const scene = new TestScene(canvasRender, keyboardInput);

	const renderEngine = new Engine(1000 / 60, () => { scene.draw() });

	renderEngine.start();
	// keyboardInput.start();
})()