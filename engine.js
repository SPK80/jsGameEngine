import { Render } from "./render";
import { Settings } from "./settings";
import { Mouse, KeyBoard } from './inputDevices.js';
import { Scene } from "./scene";

export class Engine {
	#settings = null;
	#render = null;
	#scene = null;
	#keyBoard = null;
	#mouse = null;

	constructor() {
		_this = this;
		window.onclose = () => {
			console.log('save', _this.#settings);
			_this.#settings.save();
		}

		this.#settings = new Settings();

		this.#keyBoard = new KeyBoard();
		this.#mouse = new Mouse(this.settings.render.scale);

		this.#render = new Render(
			this.#settings.render.width,
			this.#settings.render.height,
			this.#settings.render.scale,
			this.#settings.render.backgroundColor
		);

		this.#scene = new Scene(this.#render);

	}

	start() {
		this.#render.update = function (context) {
			this.#render.clearContext();

		};

		this.#render.start();
	}
}