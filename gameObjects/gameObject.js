import { throwIfUndefined, defaultIfUndefined } from "../tools/classUtils.js";

export class BaseObject {

	#name = '';
	get name() { return this.#name };

	constructor(params) {
		this.#name = throwIfUndefined(params.name, 'name');
	}

	update(drivers) { throw ('update must be implemented') }
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
		this.#x = defaultIfUndefined(params.x, 0);
		this.#y = defaultIfUndefined(params.y, 0);
		this.#z = defaultIfUndefined(params.z, 0);
	}
}