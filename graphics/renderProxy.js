import { AbstractRender } from "./AbstractRender.js";
import { Vector3 } from "../geometry/vectors.js";

// export class SortRenderProxy extends AbstractRender {
// 	#render;
// 	#order = [];
// 	#sortByY = true;

// 	constructor(render, sortByY) {
// 		this.#render = render;
// 		this.#sortByY = sortByY ? true : false;

// 	}

// 	push(func, x, y) {
// 		if (this.#sortByY) {
// 			const index = bublleFindIndex(y, this.#order.length,
// 				(i) => this.#order[i].y);
// 			this.#order.splice(index, 0, func);
// 		} else this.#order.push(func);

// 	}

// 	clear(x, y, wi, he) {
// 		this.push(this.#render.clear(x, y, wi, he));

// 	}

// 	update(sortBy) {
// 		this.#order.forEach(it => {
// 			it.func();
// 		});
// 	}
// }
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

// export class SortingRender {
// 	#render;
// 	#sortByX = false;
// 	#sortByY = false;
// 	#sortByZ = false;

// 	constructor(render, sortBy) {
// 		this.#render = render;
// 		if (!sortBy) throw ('sortBy undifined!');
// 		if (sortBy.x) this.#sortByX = true;
// 		if (sortBy.y) this.#sortByY = true;
// 		if (sortBy.z) this.#sortByZ = true;
// 	}

// 	#calls = [];

// 	#sorted = false;
// 	update() {
// 		if (!this.#sorted) {
// 			this.#sorted = true;
// 			if (this.#sortByX)
// 				this.#calls.sort((a, b) => a.pos.x - b.pos.x);
// 			if (this.#sortByY)
// 				this.#calls.sort((a, b) => a.pos.y - b.pos.y);
// 			if (this.#sortByZ)
// 				this.#calls.sort((a, b) => a.pos.z - b.pos.z);
// 		}
// 		this.#calls.forEach(call => { call.f() });
// 		this.#calls.clear();
// 		this.#sorted = false;
// 	}

// 	#push = (pos, f) => {
// 		this.#calls.push({
// 			pos: new Vector3(pos.x, pos.y, pos.z),
// 			f: f
// 		});
// 	}

// 	clear() {
// 		this.#push(new Vector3(),
// 			() => this.#render.clear());
// 	}

// 	clear(pos, size) {
// 		this.#push(pos,
// 			() => this.#render.clear(
// 				pos.x, pos.y,
// 				size.x, size.y));
// 	}

// 	rect(pos, size, color, fill) {
// 		this.#push(pos,
// 			() => this.#render.rect(
// 				pos.x, pos.y,
// 				size.x, size.y,
// 				color, fill));
// 	}

// 	circle(pos, radius, color, fill) {
// 		this.#push(pos,
// 			() => this.#render.circle(
// 				pos.x, pos.y,
// 				radius, color, fill));
// 	}

// 	text(pos, text, color, font, fill) {
// 		this.#push(pos,
// 			() => this.#render.text(
// 				pos.x, pos.y,
// 				text, color, font, fill));
// 	}

// 	sprite(pos, size, image) {
// 		this.#push(pos,
// 			() => this.#render.sprite(
// 				pos.x, pos.y,
// 				size.x, size.y,
// 				image));
// 	}

// 	tile(pos, size, tiPos, tiSize, image) {
// 		this.#push(pos,
// 			() => this.#render.tile(
// 				pos.x, pos.y,
// 				size.x, size.y,
// 				tiPos.x, tiPos.y,
// 				tiSize.x, tiSize.y,
// 				image));
// 	}
// }