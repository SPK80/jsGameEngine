import { CircleCounter, RolCounter } from "../counters.js";
import { GameObject } from './gameObject.js';

export class walkMan extends GameObject {

	#delay = 8;
	#frames = 5;

	#phase = new CircleCounter(0, (this.#frames - 1) * this.#delay, 1);
	#image = new Image();
	#imageLoaded = false;

	constructor(x, y) {
		super({
			x: x == undefined ? 100 : x,
			y: y == undefined ? 100 : y,
		});

		const _this = this;
		this.#image.addEventListener("load", function () {
			// console.log('Loaded');
			_this.#imageLoaded = true;
			// console.log(_this);

		}, false);

		this.#image.src = 'sprite.png';

		this.#width = this.#image.width;
		this.#height = this.#image.height / this.#frames;
		console.log(this.#image.width);
		console.log(this.#image.height);

	}

	#width = 0;
	#height = 0;

	draw(render) {
		const p = this.#phase.getNext();
		if (!this.#imageLoaded) return;
		render.tiling({
			image: this.#image,
			x: this.x,
			y: this.y,
			width: this.#width,
			height: this.#height,
			// tileX: 0,
			tileY: Math.round(p / this.#delay)
		})
	}

	input(inputDriver) { }

	sound(soundDriver) { }

}