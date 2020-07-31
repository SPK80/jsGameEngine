import { AbstractRender } from "./abstractRender.js";

export class PositionRender extends AbstractRender {
	#render;
	get width() { return this.#render.width }
	get height() { return this.#render.height }

	#body;
	get body() { return this.#body }

	constructor(body, render) {
		super();
		this.#render = render;
		this.#body = body;
	}

	#getX = (x) => { return x - this.#body.pos.x }
	#getY = (y) => { return y - this.#body.pos.y }

	clear() {
		this.#render.clear();
	}

	clear(x, y, wi, he) {
		this.#render.clear(this.#getX(x), this.#getY(y), wi, he);
	}

	rect(x, y, wi, he, color, fill) {
		this.#render.rect(
			this.#getX(x), this.#getY(y),
			wi, he, color, fill);
	}

	circle(x, y, radius, color, fill) {
		this.#render.circle(
			this.#getX(x), this.#getY(y),
			radius, color, fill);
	}

	text(x, y, text, color, font, fill) {
		this.#render.text(
			this.#getX(x), this.#getY(y),
			text, color, font, fill);
	}

	sprite(x, y, wi, he, image) {
		this.#render.sprite(
			this.#getX(x), this.#getY(y), wi, he, image);
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		this.#render.tile(
			this.#getX(x), this.#getY(y),
			wi, he, tiX, tiY, tiWi, tiHe, image);
	}
}