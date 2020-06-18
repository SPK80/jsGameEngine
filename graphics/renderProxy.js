import { AbstractRender } from "./abstractRender.js";
import { Vector3 } from "../geometry/vectors.js";

export class SortingRender extends AbstractRender {
	#render;
	#z = 0;

	#sortByX = false;
	#sortByY = false;
	#sortByZ = false;

	#calls = [];
	#sorted = false;

	constructor(sortBy, render) {
		super();
		this.#render = render;
		if (!sortBy) throw ('sortBy undifined!');
		if (sortBy.x) this.#sortByX = true;
		if (sortBy.y) this.#sortByY = true;
		if (sortBy.z) this.#sortByZ = true;
	}

	setZ(z) {
		this.#z = z;
		// console.log(this.#z);
	}

	#push = (x, y, f) => {
		const p = new Vector3(x, y, this.#z);
		// console.log('push', p, f);
		this.#calls.push({
			pos: p,
			f: f
		});
	}

	update() {
		if (!this.#sorted) {
			this.#sorted = true;
			if (this.#sortByX)
				this.#calls.sort((a, b) => a.pos.x - b.pos.x);
			if (this.#sortByY)
				this.#calls.sort((a, b) => a.pos.y - b.pos.y);
			if (this.#sortByZ)
				this.#calls.sort((a, b) => a.pos.z - b.pos.z);
		}
		this.#calls.forEach(call => {
			call.f();
			// console.log(call);

		});
		this.#calls = [];
		this.#sorted = false;
	}

	get width() { return this.#render.width }
	get height() { return this.#render.height }

	clear() {
		this.#push(0, 0, () =>
			this.#render.clear());
	}

	clear(x, y, wi, he) {
		this.#push(x, y, () =>
			this.#render.clear(x, y, wi, he));
	}

	rect(x, y, wi, he, color, fill) {
		this.#push(x, y, () =>
			this.#render.rect(x, y, wi, he, color, fill));
	}

	circle(x, y, radius, color, fill) {
		this.#push(x, y, () =>
			this.#render.circle(
				x, y, radius, color, fill));
	}

	text(x, y, text, color, font, fill) {
		// console.log('text', this.#z);

		this.#push(x, y, () =>
			this.#render.text(
				x, y, text, color, font, fill));
	}

	sprite(x, y, wi, he, image) {
		// console.log('sprite', this.#z);

		this.#push(x, y, () =>
			this.#render.sprite(
				x, y, wi, he, image));
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		// console.log('tile', this.#z);

		this.#push(x, y, () =>
			this.#render.tile(
				x, y, wi, he, tiX, tiY, tiWi, tiHe, image));
	}
}

export class PositionRender extends AbstractRender {
	#render;
	get width() { return this.#render.width }
	get height() { return this.#render.height }

	#body;

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