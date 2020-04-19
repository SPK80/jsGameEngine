export class GameObject {

	// #context = null;
	// get context(){
	//     return this.#context;
	// }

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
		// if (params.context == undefined)
		//     throw('params.context must be defined');
		// this.#context = params.context;
		this.#x = params.x;
		this.#y = params.y;
		this.#z = params.z;

	}

	draw(context) {
		throw ('draw must be implemented');
	}
}