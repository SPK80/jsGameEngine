import { GameObject } from "../gameObjects/gameObject.js";
import { Render } from "../graphics/render.js";
import { InputDriver } from "../inputs/inputDriver.js";

export class Scene {
	// #settings = null;
	#name = '';
	get name() { return this.#name };

	#objects = null;

	constructor(name, abilities, objects) {
		this.#name = name;
		this.#render = abilities.render;
		this.#input = abilities.input;
		this.#objects = new Objects(objects);
	}

	#render = null;
	#input = null;

	add(gameObject) {
		if (gameObject instanceof GameObject) {
			gameObject.init({
				render: this.#render,
				input: this.#input
			})
			this.#objects.push(gameObject);
		}
	}

	// #inited = false;
	// init(params) {
	// 	if (!(params.render instanceof Render)) throw (`${params.render} is not Render`);
	// 	if (!(params.input instanceof InputDriver)) throw (`${params.input} is not InputDriver`);

	// 	this.#render = params.render;
	// 	this.#input = params.input;

	// 	this.#inited = true;
	// }

	// close(params) {
	// 	this.#inited = false;
	// }

	update() {
		// if (!this.#inited) return;

		this.#render.clear();
		this.#objects.forEach(obj => {
			obj.update();
		});
	}
}