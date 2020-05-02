import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { PacScene } from "./scenes/pacScene.js";

const settings = new Settings();
// const abilities = {
// 	render: new CanvasRender(
// 		settings.render.width,
// 		settings.render.height,
// 		settings.render.backgroundColor,
// 		settings.render.scale
// 	),
// 	input: new InputDriver(true, false)
// };

// const scenes = [new PacScene('Pacman scene', abilities)];

const engine = new Engine(settings);

window.onclose = () => {
	console.log('pause', engine);
	engine.pause();

	console.log('save', settings);
	settings.save();
}

// const activeScene = scenes[0];

engine.start(new PacScene('Pacman scene'));