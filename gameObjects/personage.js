import { GameObject } from "./gameObject.js";
import { Animator } from "../animations/animator.js";
import { Vector2 } from "../geometry/vectors.js";

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

	#debugText = '';

	#ignoreRepeatingCommand = true;
	#acceptedActions = [];

	_input(action) {
		const includes = this.#acceptedActions.includes(action);
		if (this.#ignoreRepeatingCommand && includes) return;

		this.#acceptedActions.push(action);
	}

	// #moved = false;
	// #singleMove = false; //true - ignore 2nd command
	// #moveActions = ['moveRight', 'moveLeft', 'moveUp', 'moveDown'];

	_move() {

		const dir = new Vector2(0, 0);
		this.#acceptedActions.forEach(act => {
			// if (this.#moveActions.includes(act)) 
			if (act == 'moveRight') dir.x += 1;
			if (act == 'moveLeft') dir.x -= 1;
			if (act == 'moveDown') dir.y += 1;
			if (act == 'moveUp') dir.y -= 1;
		});
		dir.normalize().mul(this.#moveSpeed);
		this.x += dir.x;
		this.y += dir.y;

		// if (this.#moved && this.#singleMove) return;

		// let s = this.#moveSpeed;
		// // if (!includes) s = s * 0.707;

		// this.#debugText = `speed:${s}`;
		// moveFunc(s);
		// this.#moved = true;
	}

	moveRight() {
		this._input('moveRight');
		// this._move('moveRight', (s) => this.x += s);
	}

	moveLeft() {
		this._input('moveLeft');
		// this._move('moveLeft', (s) => this.x -= s);
	}

	moveDown() {
		this._input('moveDown');
		// this._move('moveDown', (s) => this.y += s);
	}

	moveUp() {
		this._input('moveUp');
		// this._move('moveUp', (s) => this.y -= s);
	}

	idle() {
		this._input('idle');

		// this.#acceptedActions.push('idle');
		// this._move('idle', (s) => s);
		// this.#animator.start('idle');
	}

	_startAnimation() {
		const lastAction = this.#acceptedActions[this.#acceptedActions.length - 1]
		if (lastAction == 'idle')
			this.#animator.start(lastAction);
		else
			this.#animator.start(lastAction, this.#moveSpeed);
	}

	_draw(render) {
		const frame = this.#animator.curFrame;
		if (frame) {
			render.tile({
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
			render.text({
				text: this.#debugText,
				x: this.x,
				y: this.y,
				color: 'red'
			});
		}
	}

	update(drivers) {

		if (!this.#imageLoaded) return;

		this._startAnimation();
		this._move();
		this._draw(drivers.render);

		// this.#moved = false;
		this.#acceptedActions = [];
	}
}