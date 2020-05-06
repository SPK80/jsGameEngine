import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { PacScene } from "./scenes/pacScene.js";

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

	const pacScene = new PacScene('Pacman scene', undefined, tiles);

	engine.start(pacScene);
}, false);

tiles.src = 'tiles.png';