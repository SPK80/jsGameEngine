import { CircleCounter } from "../counters";

export class walkMan extends GameObject {
	#phase = new CircleCounter(0, 3, 1);
	#image = new Image();
	constructor(x, y) {
		super({
			x: x == undefined ? 100 : x,
			y: y == undefined ? 100 : y,
		});

		this.#image.src = 'sprite.png';
	}



	draw(render) {
		const p = this.#phase.getNext();

		render.sprite({
			image: this.#image,
			width: 100,
			height: 100,
			currentFrame = p
		})
	}

}