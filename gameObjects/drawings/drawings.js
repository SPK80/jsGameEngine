import { throwIfNotInstance } from "../../tools/utils.js";
import { AbstractRender } from "../../graphics/abstractRender.js";
import { Animator } from "../../animations/animator.js";
import { IBody } from "../bodies/interfaces.js";
import { IDrawing } from "./interfaces.js";

export class EmptyDrawing extends IDrawing {

	#render;
	get render() { return this.#render };
	#body;
	get body() { return this.#body };

	constructor(render, body) {
		super();
		this.#body = throwIfNotInstance(body, IBody);
		this.#render = throwIfNotInstance(render, AbstractRender);
	}

	update() {
	}
}

export class DrawingDecorator extends IDrawing {

	get render() { return this.#object.render };
	get body() { return this.#object.body };
	#object;

	constructor(object) {
		super();
		this.#object = throwIfNotInstance(object, IDrawing);
	}

	update() {
		this.#object.update();
	}
}

export class ClearDrawing extends DrawingDecorator {

	constructor(object) {
		super(object);
	}

	update() {
		super.update();
		this.render.clear(
			this.body.pos.x,
			this.body.pos.y,
			this.body.size.x,
			this.body.size.y);
	}
}

export class ImageDrawing extends DrawingDecorator {
	#image;

	constructor(image, object) {
		super(object);
		this.#image = throwIfNotInstance(image, Image);
	}

	update() {
		super.update();
		this.render.sprite(
			this.body.pos.x,
			this.body.pos.y,
			this.body.size.x,
			this.body.size.y,
			this.#image);
	}
}

export class AnimDrawing extends DrawingDecorator {
	#image;
	#animator;
	// #speed = 1;
	#state;

	constructor(image, animations, state, object) {
		super(object);
		this.#image = throwIfNotInstance(image, Image);
		this.#animator = new Animator(animations);
		this.#state = state;
	}

	_startAnim(speed = 1) {
		this.#animator.start(this.#state.get(), speed);
	}

	update() {
		super.update();
		this._startAnim();
		const frame = this.#animator.curFrame;
		//debug text
		// this.render.text( 
		// 	this.body.pos.x,
		// 	this.body.pos.y,
		// 	this.body.pos.z,
		// 	'red',
		// 	true
		// );
		if (frame) {
			this.render.tile(
				this.body.pos.x,
				this.body.pos.y,
				this.body.size.x,
				this.body.size.y,
				frame.x,
				frame.y,
				frame.wi,
				frame.he,
				this.#image
			);
		}
	}
}

