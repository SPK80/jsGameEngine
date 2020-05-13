import { GameObject } from "./gameObject.js";
import { Animator } from "../animations/animator.js";

export class Personage extends GameObject {

	#image = new Image();
	#imageLoaded = false;

	#moveSpeed = 1;
	#states = {
		IDLE: 0,
		GO: 1,
	};

	#width = 32;
	#height = 32;

	// #state = this.#states.IDLE;

	#animator;

	constructor(name, x, y, image, animations) {

		super({
			name: name,
			x: x == undefined ? 100 : x,
			y: y == undefined ? 100 : y,
			z: 1
		});

		this.#animator = new Animator(animations);

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
		this.#animator.start('idle');
	}

	#predAction = '';

	moveRight() {

		if (this.#predAction == 'moveRight')
			this.x += this.#moveSpeed;
		else {
			this.#animator.start('moveRight');
			this.x += this.#moveSpeed * 0.707;
		}
		this.#predAction = 'moveRight';
	}

	moveLeft() {

		if (this.#predAction == 'moveLeft')
			this.x -= this.#moveSpeed;
		else {
			this.#animator.start('moveLeft');
			this.x -= this.#moveSpeed * 0.707;
		}
		this.#predAction = 'moveLeft';
	}

	moveDown() {

		if (this.#predAction == 'moveDown')
			this.y += this.#moveSpeed;
		else {
			this.y += this.#moveSpeed * 0.707;
			this.#animator.start('moveDown');
		}
		this.#predAction = 'moveDown';
	}

	moveUp() {

		if (this.#predAction == 'moveUp')
			this.y -= this.#moveSpeed;
		else {
			this.y -= this.#moveSpeed * 0.707;
			this.#animator.start('moveUp');
		}
		this.#predAction = 'moveUp';
	}

	update(drivers) {

		if (!this.#imageLoaded) return;

		const frame = this.#animator.curFrame;
		if (frame) {

			drivers.render.tile({
				image: this.#image,
				absoluteTilePos: true,
				x: this.x,
				y: this.y,
				width: this.#width,
				height: this.#height,
				tileX: frame.x,
				tileY: frame.y,
				tileWidth: frame.wi,
				tileHeight: frame.he
			});
		}
		drivers.render.text({
			text: `${this.#predAction} ${frame.x} ${frame.y} ${frame.delay}`,
			x: this.x,
			y: this.y,
		});
	}
}