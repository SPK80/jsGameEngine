import { Body } from "./bodies/bodies.js";
import { IGameObject } from "./common.js";
import { EmptyDrawing } from "./drawings/drawings.js";

export class GameObject extends IGameObject {
	#name;
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

	constructor(name, render, pos, size) {
		super();

		if (typeof name != "string") throw ('name must be string');
		this.#name = name;

		if (pos && size) {
			if (!(pos instanceof Vector2)) throw ('pos must be Vector2');
			if (!(size instanceof Vector2)) throw ('size must be Vector2');
			this.#body = new Body(pos.x, pos.y, pos.z, size.x, size.y);
		}
		else this.#body = new Body();

		this.#drawing = new EmptyDrawing(render, this.#body);
	}

	update() {
		this.body.update();
		this.drawing.update();
	}
}

