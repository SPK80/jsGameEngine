import { GameObject } from "../gameObjects/gameObject.js";

export class Scene {
	// #settings = null;
	// #displayed = [];
	// #controlled = [];
	// #sounding = [];

	constructor(id, settings) {
		// this.#settings = settings.scenes[id];
	}

	#objects = [];

	add(gameObject) {
		if (gameObject instanceof GameObject)
			this.#objects.push(gameObject);
	}

	init(params) {

	}

	close(params) {

	}

	update(params) {
		if (params.render) params.render.clear();
		this.#objects.forEach(obj => {
			obj.update(params);
		});
	}
}