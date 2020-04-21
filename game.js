import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { Scene } from "./scene.js";

const settings = new Settings();
const engine = new Engine(settings);

window.onclose = () => {
	console.log('pause', engine);
	engine.pause();

	console.log('save', settings);
	settings.save();
}

// const scenes = [new Scene(render)];
// const activeScene = scenes[0];

engine.start(new Scene(settings));