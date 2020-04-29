import { CircleCounter, RolCounter } from "../counters.js";
import { GameObject } from './gameObject.js';

export class walkMan extends GameObject {

	#delay = 8;
	#frames = 5;

	#phase = new CircleCounter(0, (this.#frames - 1) * this.#delay, 1);
	#image = new Image();
	#imageLoaded = false;
	#tileWidth = 0;
	#tileHeight = 0;

	constructor(x, y) {
		super({
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


	init(params) {
		console.log('walkMan init');
	}

	#width = 0;
	#height = 0;

	update(params) {

		const p = this.#phase.getNext();
		if (!this.#imageLoaded) {
			return;
		}

		params.render.tiling({
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