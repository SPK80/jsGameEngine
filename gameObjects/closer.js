import { IUpdating } from "./common.js";
import { Vector2 } from "../geometry/vectors.js";

export class Closer extends IUpdating {
	#target;
	#moving;
	#speed;

	constructor(moving, target, speed) {
		super();
		this.#target = target;
		this.#moving = moving;
		this.#speed = speed;
	}

	update() {
		const ms = new Vector2(this.#moving.size.x, this.#moving.size.y).scMul(0.5);
		const ts = new Vector2(this.#target.size.x, this.#target.size.y).scMul(0.5);
		const v = new Vector2(this.#moving.pos.x, this.#moving.pos.y).
		add(ms).sub(ts).sub(this.#target.pos);

		if (v.length() > 1)
			this.#moving.pos.sub(v.scMul(this.#speed));
	}
}