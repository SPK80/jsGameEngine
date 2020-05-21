import { GameObject } from "./gameObject.js";
import { Animator } from "../animations/animator.js";
import { Vector2 } from "../geometry/vectors.js";
import { throwIfNotInstance } from "../tools/classUtils.js";

export class Personage extends GameObject {

	#image;

	#moveSpeed = 1;
	// #states = {
	// 	IDLE: 0,
	// 	GO: 1,
	// };

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

		this.#image = throwIfNotInstance(image, Image);

		this._input('idle');
	}

	#debugText = '';

	#ignoreRepeatingCommand = true;
	#acceptedActions = [];

	_input(action) {
		const includes = this.#acceptedActions.includes(action);
		if (this.#ignoreRepeatingCommand && includes) return;

		this.#acceptedActions.push(action);
	}

	#direction = new Vector2(0, 0);
	_move() {
		this.#direction = new Vector2(0, 0);
		this.#acceptedActions.forEach(act => {
			if (act == 'moveRight') this.#direction.x += 1;
			if (act == 'moveLeft') this.#direction.x -= 1;
			if (act == 'moveDown') this.#direction.y += 1;
			if (act == 'moveUp') this.#direction.y -= 1;
		});
		if (Math.abs(this.#direction.x) < 1 && Math.abs(this.#direction.y) < 1) return;

		this.#direction.normalize().mul(this.#moveSpeed);
		this.#debugText = `${this.#direction.x}, ${this.#direction.y}`;

		this.x += this.#direction.x;
		this.y += this.#direction.y;
	}

	_startAnimation() {
		const lastAction = this.#acceptedActions[this.#acceptedActions.length - 1]
		if (lastAction == undefined) return;
		if (lastAction == 'idle')
			this.#animator.start('idle');
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
			// render.text({
			// 	text: this.#debugText,
			// 	x: this.x,
			// 	y: this.y,
			// 	color: 'red'
			// });
		}
	}

	update(drivers) {
		if (drivers.input) {
			const commands = drivers.input.get();
			if (commands && commands.length > 0)
				commands.forEach(com => {
					this._input(com);
				});
			else this._input('idle');
		}

		this._startAnimation();
		this._draw(drivers.render);
		this._move();

		this.#acceptedActions = [];
	}
}