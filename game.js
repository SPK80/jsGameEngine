import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { loadImage } from "./image.js";

(async function game() {

	const settings = new Settings();

	const engine = new Engine(settings);

	window.onclose = () => {
		console.log('pause', engine);
		engine.pause();

		console.log('save', settings);
		settings.save();
	}


	try {
		const tiles = await loadImage('tiles.png');
		console.log(tiles);

	} catch (error) {
		console.error(error)
	}

})()

 class Scene{
	 
 }