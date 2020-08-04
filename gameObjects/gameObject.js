import { Body } from "./bodies/bodies.js";
import { throwIfNotInstance } from "../tools/utils.js";
import { IBody } from "./bodies/interfaces.js";
import { IGameObject } from "./common.js";
import { EmptyDrawing } from "./drawings/drawings.js";

export class BodyGameObject extends IGameObject {
	#name = '';
	get name() { return this.#name }

	#body;
	get body() { return this.#body }

	decorateBody(_class, ...params) {
		this.#body = new _class(...params, this.#body);
	}

	constructor(name, pos, size) {
		super();
		this.#name = name;
		console.log(pos, size);
		if (pos && size)
			this.#body = new Body(pos.x, pos.y, pos.z, size.wi, size.he);
		else
			this.#body = new Body();
	}

	update() {
		this.#body.update();
	}
}

export class DrawingGameObject extends BodyGameObject {
	#drawing;
	get drawing() { return this.#drawing }

	decorateDrawing(_class, ...params) {
		this.#drawing = new _class(...params, this.#drawing);
	}

	constructor(name, pos, size, render) {
		super(name, pos, size);
		this.#drawing = new EmptyDrawing(render, this.body)
	}

	update() {
		super.update();
		this.#drawing.update();
	}
}