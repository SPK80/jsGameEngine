import { GameObject } from "./gameObject.js";
import { CircleCounter } from "../tools/counters.js";

export class Pers extends GameObject {

	#delay = 10;
	#frames = 3;
	#phase = new CircleCounter(0, (this.#frames - 1) * this.#delay, 1);

	#image = new Image();
	#imageLoaded = false;
	#tileWidth = 32;
	#tileHeight = 32;

	#animations = {
		idle: [{ x: 0, y: 256 }, { x: 0, y: 288 }, { x: 0, y: 320 }, { x: 0, y: 352 }],
		moveRight: [{ x: 0, y: 320 }, { x: 32, y: 320 }, { x: 64, y: 320 }],
		moveLeft: [{ x: 0, y: 288 }, { x: 32, y: 288 }, { x: 64, y: 288 }],
		moveDown: [{ x: 0, y: 256 }, { x: 32, y: 256 }, { x: 64, y: 256 }],
		moveUp: [{ x: 0, y: 352 }, { x: 32, y: 352 }, { x: 64, y: 352 }],
	}

	#width = this.#tileWidth;
	#height = this.#tileHeight;
	
	getAnimation(state, direction) {

	}

	constructor(name, x, y, image) {
		super({
			name: name,
			x: x == undefined ? 100 : x,
			y: y == undefined ? 100 : y,
			z: 1
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

	#direction = 10;
	#directions = {
		down: 8,
		up: 11,
		left: 9,
		right: 10,
	}

	#moveSpeed = 1;
	#states = {
		IDLE: 0,
		GO: 1,
	};

	#state = this.#states.IDLE;
	#predAction = '';

	moveRight() {
		this.#direction = this.#directions.right;

		if (this.#predAction == 'moveRight')
			this.x += this.#moveSpeed;
		else
			this.x += this.#moveSpeed * 0.707;

		this.#state = this.#states.GO;
		this.#predAction = 'moveRight';
	}

	moveLeft() {
		this.#direction = this.#directions.left;

		if (this.#predAction == 'moveLeft')
			this.x -= this.#moveSpeed;
		else
			this.x -= this.#moveSpeed * 0.707;

		this.#state = this.#states.GO;
		this.#predAction = 'moveLeft';
	}

	moveDown() {
		this.#direction = this.#directions.down;

		if (this.#predAction == 'moveDown')
			this.y += this.#moveSpeed;
		else
			this.y += this.#moveSpeed * 0.707;

		this.#state = this.#states.GO;
		this.#predAction = 'moveDown';
	}

	moveUp() {
		this.#direction = this.#directions.up;

		if (this.#predAction == 'moveUp')
			this.y -= this.#moveSpeed;
		else
			this.y -= this.#moveSpeed * 0.707;

		this.#state = this.#states.GO;
		this.#predAction = 'moveUp';
	}

	update(drivers) {

		const phase = this.#phase.next;
		if (!this.#imageLoaded) return;

		let tx = 0;
		if (this.#state == this.#states.GO)
			tx = Math.round(phase / this.#delay);
		else
			this.#state = this.#states.IDLE;

		let anim = this.#animations.idle;

		if (this.#direction == this.#directions.down)
			anim = this.#animations.moveDown;

		if (this.#direction == this.#directions.up)
			anim = this.#animations.moveUp;

		if (this.#direction == this.#directions.up)
			anim = this.#animations.moveUp;

		drivers.render.tile({
			image: this.#image,
			x: this.x,
			y: this.y,
			width: this.#width,
			height: this.#height,
			tileWidth: this.#tileWidth,
			tileHeight: this.#tileHeight,
			tileX: tx,
			tileY: this.#direction
		});

		// drivers.render.text({
		// 	text: this.#state,
		// 	x: this.x,
		// 	y: this.y,
		// });
	}

}