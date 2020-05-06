import { GameObject } from "./gameObject.js";
import { CircleCounter } from "../counters.js";

export class Pers extends GameObject {

	#delay = 10;
	#frames = 3;
	#phase = new CircleCounter(0, (this.#frames - 1) * this.#delay, 1);

	#image = new Image();
	#imageLoaded = false;
	#tileWidth = 32;
	#tileHeight = 32;

	#width = this.#tileWidth;
	#height = this.#tileHeight;

	constructor(name, x, y, image) {
		super({
			name: name,
			x: x == undefined ? 100 : x,
			y: y == undefined ? 100 : y,
		});

		if (image == undefined) {
			const _this = this;
			this.#image.addEventListener("load", function () {
				_this.#imageLoaded = true;
			}, false);
			this.#image.src = 'tiles.png';
		}
		else {
			this.#image = image;
			this.#imageLoaded = true;
		}
	}

	#directions = {
		down: 8,
		up: 11,
		left: 9,
		right: 10,
	}

	#direction = 10;
	#moveSpeed = 1;

	moveRight() {
		this.#direction = this.#directions.right;
		this.x += this.#moveSpeed;
	}

	moveLeft() {
		this.#direction = this.#directions.left;
		this.x -= this.#moveSpeed;
	}

	moveDown() {
		this.#direction = this.#directions.down;
		this.y += this.#moveSpeed;
	}

	moveUp() {
		this.#direction = this.#directions.up;
		this.y -= this.#moveSpeed;
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
			tileX: Math.round(p / this.#delay),
			tileY: this.#direction
		})
	}
}