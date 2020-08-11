import { Vector2 } from "./vectors.js";

export class Range {
	#lefttop;
	get lefttop() { return this.#lefttop }
	get left() { return this.#lefttop.x }
	get top() { return this.#lefttop.y }

	#rightbottom;
	get rightbottom() { return this.#rightbottom }
	get right() { return this.#rightbottom.x }
	get bottom() { return this.#rightbottom.y }

	constructor(lefttop, rightbottom) {
		this.#lefttop = Vector2.fromVector(lefttop);
		this.#rightbottom = Vector2.fromVector(rightbottom);
	}

	inside(object) {
		if (object instanceof Vector2) {
			return object.x >= this.left && object.x <= this.right &&
				object.y >= this.top && object.y <= this.bottom;
		}
		else if (object instanceof Range) {
			return this.inside(object.lefttop) &&
				this.inside(object.rightbottom);
		}
	}

	onRight(point) { return (point.x > this.right) }
	onLeft(point) { return (point.x < this.left) }
	above(point) { return (point.y < this.top) }
	below(point) { return (point.y > this.bottom) }

	static fromVectors(pos, size) {
		return new Range(pos, size)
	}
}