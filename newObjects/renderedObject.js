import { ObjectDecorator } from "./objectDecorator";
import { throwIfNotInstance } from "../tools/utils.js";
import { PositionObject } from "./positionObject";

export class ClearObject extends UpdateInterface {
	#render;
	get render() { return this.#render };

	constructor(image, render, object) {
		super(throwIfNotInstance(object, PositionObject));
		this.#render = throwIfNotInstance(render, AbstractRender);
	}

	update() {
		this.#render.clear(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
}

export class StaticImageObject extends UpdateInterface {
	#image;
	get image() { return this.#image };

	#object;
	
	constructor(image, object) {
		this.#object = throwIfNotInstance(object, ClearObject);
		// super(throwIfNotInstance(object, ClearObject));
		this.#image = throwIfNotInstance(image, Image);
	}

	update() {
		this.#object.render.sprite(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
}