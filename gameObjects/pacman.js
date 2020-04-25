import { GameObject } from './gameObject.js';
import { RolCounter } from '../counters.js';

export class Pacman extends GameObject {

	#phase = new RolCounter(0, 0.25, 0.02);

	#color;
	get color() { return this.#color }

	constructor(x, y, color) {
		super({
			x: x == undefined ? 100 : x,
			y: y == undefined ? 100 : y,
		});

		this.#color = color == undefined ? '#A00090' : color;
		// var c = Number.parseHex(this.#color);
		// console.log(c);
	}

	// #dph = 0.02;
	draw(render) {
		// this.#phase += this.#dph;
		// if (this.#phase > 0.25 || this.#phase < 0) this.#dph = -this.#dph;
		const phase = this.#phase.getNext();
		render.context.fillStyle = this.color;
		render.context.beginPath();
		render.context.arc(this.x, this.y, 20, this.#angle + Math.PI * phase, this.#angle + Math.PI * (2 - phase));
		render.context.lineTo(this.x, this.y);
		render.context.fill();
	}

	input(inputDriver) {
		if (inputDriver.keyPressed('UP')) this.moveForward(1);
		if (inputDriver.keyPressed('DOWN')) this.moveBack(1);
		if (inputDriver.keyPressed('LEFT')) this.turnOn(-0.1);
		if (inputDriver.keyPressed('RIGHT')) this.turnOn(0.1);
	}

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

	moveForward(moveSpeed) {
		// console.log('moveForward', this);
		const dir = this.direction;
		var dx = dir.x * moveSpeed;
		var dy = dir.y * moveSpeed;
		this.x += dx;
		this.y += dy;
	}

	moveBack(moveSpeed) {
		// console.log('moveBack', this);
		const dir = this.direction;
		var dx = dir.x * moveSpeed;
		var dy = dir.y * moveSpeed;
		this.x -= dx;
		this.y -= dy;
	}
}