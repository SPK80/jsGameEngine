import { GameObject } from './gameObject.js';
import { all } from '../extentions.js';

export class Pacman extends GameObject {
	#phase = 0;
	#color;
	get color() { return this.#color }

	constructor(x, y, color) {
		super({
			// context : params.context,
			x: x == undefined ? 100 : x,
			y: y == undefined ? 100 : y,
		});

		this.#color = color == undefined ? '#A00090' : color;
	}

	#dph = 0.02;
	draw(render) {
		this.#phase += this.#dph;
		if (this.#phase > 0.25 || this.#phase < 0) this.#dph = -this.#dph;

		render.context.fillStyle = this.color;
		render.context.beginPath();
		render.context.arc(this.x, this.y, 20, this.#angle + Math.PI * this.#phase, this.#angle + Math.PI * (2 - this.#phase));
		render.context.lineTo(this.x, this.y);
		render.context.fill();
	}

	input(inputDriver) {
		if (inputDriver.keyPressed('UP')) this.moveForward();
		if (inputDriver.keyPressed('DOWN')) this.moveBack();
		if (inputDriver.keyPressed('LEFT')) this.turnOn(-0.1);
		if (inputDriver.keyPressed('RIGHT')) this.turnOn(0.1);

	}

	#moveSpeed = 1;
	get moveSpeed() { return this.#moveSpeed };
	set moveSpeed(value) { this.#moveSpeed = value };

	// sides = {
	//     right: 0.0,
	//     down: 0.5*Math.PI,
	//     left: Math.PI,
	//     up: 1.5*Math.PI
	// }

	#direction = {
		x: 0,
		y: 0
	}
	get direction() {
		this.#direction.y = Math.sin(this.#angle);
		this.#direction.x = Math.cos(this.#angle);
		return this.#direction;
	}

	#angle = 0;
	get angle() { return this.#angle }

	turnOn(delta) {
		this.#angle += delta;
		this.direction;
	}

	moveForward() {
		// console.log('moveForward', this);
		const dir = this.direction;
		var dx = dir.x * this.#moveSpeed;
		var dy = dir.y * this.#moveSpeed;
		this.x += dx;
		this.y += dy;
	}

	moveBack() {
		// console.log('moveBack', this);
		const dir = this.direction;
		var dx = dir.x * this.#moveSpeed;
		var dy = dir.y * this.#moveSpeed;
		this.x -= dx;
		this.y -= dy;
	}
}