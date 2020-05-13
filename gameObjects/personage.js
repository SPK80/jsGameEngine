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
	}

	#completedActions = [];
	#moved = false;
	#singleMove = true; //true - ignore 2nd command
	#ignoreRepeatingCommand = true;
	_move(action, moveFunc) {
		if (this.#ignoreRepeatingCommand && this.#completedActions.includes(action)) return;
		if (!this.#moved) this.#animator.start(action, this.#moveSpeed);
		else if (this.#singleMove) return;
		let s = this.#moveSpeed;
		if (this.#completedActions != action) {
			s = s * 0.707;
		}

		moveFunc(s);
		this.#moved = true;
		this.#completedActions.push(action);
	}

	moveRight() {
		this._move('moveRight', (s) => this.x += s);
	}

	moveLeft() {
		this._move('moveLeft', (s) => this.x -= s);
	}

	moveDown() {
		this._move('moveDown', (s) => this.y += s);
	}

	moveUp() {
		this._move('moveUp', (s) => this.y -= s);
	}

	idle() {
		// this._move('idle', (s) => s);
		this.#animator.start('idle');
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
			// drivers.render.text({
			// 	text: `${this.#s}`,
			// 	x: this.x,
			// 	y: this.y,
			// });
		}
		this.#moved = false;
	}
}