import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { PacScene } from "./scenes/pacScene.js";

// import { PressedKeys, KeyBoardInput } from "./inputs/input.js";
// import { KeyMap } from "./inputs/keyMap.js";

const settings = new Settings();

const engine = new Engine(settings);

window.onclose = () => {
	console.log('pause', engine);
	engine.pause();

	console.log('save', settings);
	settings.save();
}

engine.start(new PacScene('Pacman scene'));

// const kmap = new KeyMap([
// 	{ action: 'moveForward', keys: [KeyMap.KEYS.UP] },
// 	{ action: 'moveBack', keys: [KeyMap.KEYS.DOWN] },
// ]);
// console.log(kmap);

// const inp = new KeyBoardInput(kmap);

// setInterval(function render() {
// 	console.log(inp.get());

// }, 1000);