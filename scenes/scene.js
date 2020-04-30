import { GameObject } from "../gameObjects/gameObject.js";
import { Render } from "../graphics/render.js";
import { InputDriver } from "../inputs/inputDriver.js";

export class Scene {
	// #settings = null;
	#name = '';
	get name() { return this.#name };

	constructor(name, settings) {
		// this.#settings = settings.scenes[id];
		this.#name = name;
	}

	#objects = [];

	add(gameObject) {
		if (gameObject instanceof GameObject)
			this.#objects.push(gameObject);
	}

	#render = null;
	#input = null;

	#inited = false;
	init(params) {
		if (!(params.render instanceof Render)) throw (`${params.render} is not Render`);
		if (!(params.input instanceof InputDriver)) throw (`${params.input} is not InputDriver`);

		this.#render = params.render;
		this.#input = params.input;

		this.#inited = true;
	}

	close(params) {
		this.#inited = false;
	}

	update() {
		if (!this.#inited) return;

		this.#render.clear();
		const _this = this;
		this.#objects.forEach(obj => {
			obj.update({
				render: _this.#render,
				input: _this.#input
			});
		});
	}
}