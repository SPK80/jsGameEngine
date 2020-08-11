import { Vector2 } from "../../geometry/vectors.js";
import { throwIfNotInstance } from "../../tools/utils.js";
import { DrawingDecorator } from "./drawings.js";

export class InfinitImageDrawing extends DrawingDecorator {
	#image;
	#renderBody;

	constructor(image, object) {
		super(object);
		this.#image = throwIfNotInstance(image, Image);
		this.#renderBody = this.render.body;
	}

	relocate(shiftX, shiftY) {
		const shiftVector = new Vector2(shiftX * this.body.size.x, shiftY * this.body.size.y);
		console.log(shiftVector);
		this.body.pos.add(shiftVector);
	}

	update() {
		super.update();

		if (this.#renderBody.pos.x < this.body.pos.x)
			this.relocate(-1, 0);
		if (this.#renderBody.pos.x > this.body.pos.x + this.body.size.x)
			this.relocate(1, 0);
		if (this.#renderBody.pos.y < this.body.pos.y)
			this.relocate(0, -1);
		if (this.#renderBody.pos.y > this.body.pos.y + this.body.size.y)
			this.relocate(0, 1);

		const renderRight = this.#renderBody.pos.x + this.#renderBody.size.x;
		const thisRight = this.body.pos.x + this.body.size.x;

		if (renderRight > thisRight) {
			this.render.sprite(
				this.body.pos.x + this.body.size.x,
				this.body.pos.y,
				this.body.size.x,
				this.body.size.y,
				this.#image);
		}

		const renderBottom = this.#renderBody.pos.y + this.#renderBody.size.y;
		const thisBottom = this.body.pos.y + this.body.size.y;

		if (renderBottom > thisBottom) {
			this.render.sprite(
				this.body.pos.x,
				this.body.pos.y + this.body.size.y,
				this.body.size.x,
				this.body.size.y,
				this.#image);
		}

		if (renderRight > thisRight && renderBottom > thisBottom) {
			this.render.sprite(
				this.body.pos.x + this.body.size.x,
				this.body.pos.y + this.body.size.y,
				this.body.size.x,
				this.body.size.y,
				this.#image);
		}

		this.render.sprite(
			this.body.pos.x,
			this.body.pos.y,
			this.body.size.x,
			this.body.size.y,
			this.#image);
	}
}
