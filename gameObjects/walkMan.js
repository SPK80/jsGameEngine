import { CircleCounter } from "../tools/counters.js";
import { GameObject } from './gameObject.js';

export class WalkMan extends GameObject {

	#delay = 8;
	#frames = 5;
	#phase = new CircleCounter(0, (this.#frames - 1) * this.#delay, 1);
	#image = new Image();
	#imageLoaded = false;
	#tileWidth = 0;
	#tileHeight = 0;

	#width = 0;
	#height = 0;

	constructor(name, x, y) {
		super({
			name: name,
			x: x == undefined ? 100 : x,
			y: y == undefined ? 100 : y,
		});

		const _this = this;
		this.#image.addEventListener("load", function () {
			_this.#tileWidth = _this.#image.width;
			_this.#tileHeight = _this.#image.height / _this.#frames;
			_this.#width = _this.#tileWidth / 2;
			_this.#height = _this.#tileHeight / 2;			// console.log('Loaded', _this.#image);
			_this.#imageLoaded = true;
		}, false);

		this.#image.src = 'sprite.png';
	}	

	update(drivers) {

		const p = this.#phase.next;
		if (!this.#imageLoaded) {
			return;
		}

		drivers.render.tile({
			image: this.#image,
			x: this.x,
			y: this.y,
			width: this.#width,
			height: this.#height,
			tileWidth: this.#tileWidth,
			tileHeight: this.#tileHeight,
			// tileX: 0,
			tileY: Math.round(p / this.#delay)
		})
	}
}
