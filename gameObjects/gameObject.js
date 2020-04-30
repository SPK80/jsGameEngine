import { Render } from "../graphics/render.js";
import { InputDriver } from "../inputs/inputDriver.js";

class BaseObject {
	init(params) { }
	update() { throw ('update not implemented') }

}
export class GameObject {

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
		this.#x = params.x;
		this.#y = params.y;
		this.#z = params.z;
		this.init(params);
	}

	#inited = false;
	get inited() { return this.#inited }

	#render = null;
	get render() { return this.#render }

	#input = null;
	get input() { return this.#input }

	init(params) {

		if ((params.render instanceof Render))
			this.#render = params.render;

		if ((params.input instanceof InputDriver))
			this.#input = params.input;

		this.#inited = true;
	}

	kill(params) {
		this.#inited = false;
	}

	update() { throw ('update not implemented') }
}