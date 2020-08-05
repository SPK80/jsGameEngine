import { Body } from "./bodies/bodies.js";
import { IGameObject } from "./common.js";
import { EmptyDrawing } from "./drawings/drawings.js";

export class GameObject extends IGameObject {
	#name = 'GameObject';
	get name() { return this.#name; }

	#body = new Body();
	get body() { return this.#body; }

	decorateBody(_class, ...params) {
		this.#body = new _class(...params, this.#body);
	}

	#drawing;
	get drawing() { return this.#drawing; }

	decorateDrawing(_class, ...params) {
		this.#drawing = new _class(...params, this.#drawing);
	}

	constructor(name, pos, size, render) {
		super();
		this.#name = name;
		if (pos && size)
			this.#body = new Body(pos.x, pos.y, pos.z, size.x, size.y);
		this.#drawing = new EmptyDrawing(render, this.#body);
	}

	update() {
		this.body.update();
		this.drawing.update();
	}
}