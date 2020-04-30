import { GameObject } from './gameObject.js';
import { RolCounter } from '../counters.js';

export class Pacman extends GameObject {

	#phase = new RolCounter(0, 0.25, 0.02);

	#color;
	#radius;
	get color() { return this.#color }

	constructor(x, y, color, size) {
		super({
			x: x == undefined ? 100 : x,
			y: y == undefined ? 100 : y,
		});
		this.#color = color == undefined ? '#A00090' : color;
		this.#radius = size == undefined ? 20 : size / 2;
	}

	init(params) {
		if (!(params.render instanceof Render)) throw (`${params.render} is not Render`);
		if (!(params.input instanceof InputDriver)) throw (`${params.input} is not InputDriver`);

		super.init(params);
		console.log('Pacman inited');
	}

	update() {
		const phase = this.#phase.getNext();
		const _endAngle = this.#angle + Math.PI * (2 - phase);
		const _startAngle = this.#angle + Math.PI * phase;
		this.render.path({
			color: this.color,
			fill: true,
			elements: [
				{
					type: 'arc',
					x: this.x,
					y: this.y,
					radius: this.#radius,
					startAngle: _startAngle,
					endAngle: _endAngle,
				},
				{
					type: 'lineTo',
					x: this.x,
					y: this.y,
				},
				{
					type: 'lineTo',
					x: this.x + this.#radius * Math.cos(_startAngle),
					y: this.y + this.#radius * Math.sin(_startAngle),
				},
			]
		});

		var eyeAngle = _endAngle - 0.4;
		// if (this.#angle > Math.PI) eyeAngle = eyeAngle - Math.PI;

		this.render.circle({
			fill: true,
			color: '#B000A0',
			x: this.x + this.#radius * Math.cos(eyeAngle) * 0.6,
			y: this.y + this.#radius * Math.sin(eyeAngle) * 0.6,
			radius: 3
		})

		// render.context.fillStyle = this.color;
		// render.context.beginPath();
		// render.context.arc(this.x, this.y, 20, this.#angle + Math.PI * phase, this.#angle + Math.PI * (2 - phase));
		// render.context.lineTo(this.x, this.y);
		// render.context.fill();

		if (this.input.keyPressed('UP')) this.moveForward(1);
		if (this.input.keyPressed('DOWN')) this.moveBack(1);
		if (this.input.keyPressed('LEFT')) this.turnOn(-0.1);
		if (this.input.keyPressed('RIGHT')) this.turnOn(0.1);
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