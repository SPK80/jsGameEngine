import { IGameObject } from "../gameObjects/common.js";

export class ViewPort extends IGameObject {
	#name = 'ViewPort';
	get name() { return this.#name }
	get body() { return this.#closer }
	#closer;
	constructor(name, closer) {
		super();
		this.#closer = closer;
		this.#name = name;
	}
	update() {
		this.#closer.update();
	}
}