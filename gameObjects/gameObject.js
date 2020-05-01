import { Render } from "../graphics/render.js";
import { InputDriver } from "../inputs/inputDriver.js";

export class BaseObject {

	#name = '';
	get name() { return this.#name };

	#input = null;
	get input() { return this.#input };

	#render = null;
	get render() { return this.#render };

	#sound = null;
	get sound() { return this.#sound };

	#phisics = null;
	get phisics() { return this.#phisics };

	constructor(params) {
		this.#name = params.name;
		console.log(params);

		if ((params.abilities.render instanceof Render))
			this.#render = params.abilities.render;
		if ((params.abilities.input instanceof InputDriver))
			this.#input = params.abilities.input;
		// if ((params.abilities.sound instanceof Sound))
		// 	this.#sound = params.abilities.sound;
		// if ((params.abilities.phisics instanceof Phisics))
		// 	this.#phisics = params.abilities.phisics;
	}

	update() { throw ('update must be implemented') }
}

export class GameObject extends BaseObject {

	#x = 0;
	get x() { return this.#x };
	set x(value) { if (value != undefined) this.#x = value };

	#y = 0;
	get y() { return this.#y };
	set y(value) { if (value != undefined) this.#y = value };

	#z = 0;
	get z() { return this.#z };
	set z(value) { if (value != undefined) this.#z = value };

	constructor(params) {
		super(params);
		this.#x = params.x;
		this.#y = params.y;
		this.#z = params.z;
	}
}

export class DrivenObgect extends {
	do() {
		throw ('do must be implemented')
	}
}