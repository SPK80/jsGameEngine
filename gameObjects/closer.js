import { Vector2 } from "../geometry/vectors.js";
import { BodyDecorator } from "./bodies.js";
import { throwIfNotInstance } from "../tools/utils.js";
import { IBody } from "./common.js";

export class Closer extends BodyDecorator {
	#target;
	#speed;

	constructor(target, speed, object) {
		super(object);
		this.#target = throwIfNotInstance(target, IBody);
		this.#speed = speed;
	}

	update() {
		super.update();
		const ms = new Vector2(this.size.x, this.size.y).scMul(0.5);
		const ts = new Vector2(this.#target.size.x, this.#target.size.y).scMul(0.5);
		const v = new Vector2(this.pos.x, this.pos.y).
			add(ms).sub(ts).sub(this.#target.pos);

		if (v.length() > 1)
			this.pos.sub(v.scMul(this.#speed));
	}
}