import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { PacScene } from "./scenes/pacScene.js";

const settings = new Settings();
const scenes = [new PacScene('Pacman scene', settings)];

const engine = new Engine(settings, scenes);

window.onclose = () => {
	console.log('pause', engine);
	engine.pause();

	console.log('save', settings);
	settings.save();
}

// const activeScene = scenes[0];

engine.start('Pacman scene');