import { Vector3 } from "../geometry/vectors.js";
import { BodyDecorator } from "./bodies.js";

export class DeltaPosBody extends BodyDecorator {
	#pred = new Vector3();
	get pos() {
		return new Vector3(
			this.pos.x,
			this.pos.y,
			this.pos.z
		).sub(this.#pred);
	}
}

export class DeltaSizeBody extends BodyDecorator {
	#pred = new Vector3();
	get size() {
		return new Vector3(
			this.pos.x,
			this.pos.y,
			this.pos.z
		).sub(this.#pred);
	}
}

export class PhisicsBody extends BodyDecorator {
	#predPos = new Vector3();
	#mass = 0;
	#deltaTime = 0.01;
	#velocity = new Vector3();

	update() {
		super.update();
		// const deltaPos = new Vector3(this.pos.x, this.pos.y, this.pos.z).
		// 	sub(this.#predPos);

		// const velocity = deltaPos.scMul(1 / this.#deltaTime);
		// const velocity = new Vector3(this.object.speed.x, this.object.speed.y, this.object.speed.z);

		// const momentum = velocity.scMul(this.#mass);

		// this.#predPos = new Vector3(this.pos.x, this.pos.y, this.pos.z);

	}
}