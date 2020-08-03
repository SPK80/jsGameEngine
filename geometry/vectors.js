export class Vector2 {
	#x = 0;
	get x() { return this.#x };

	#y = 0;
	get y() { return this.#y };

	constructor(x = 0, y = 0) {
		this.#x = x;
		this.#y = y;

		// this.prototype.toString = () => `Vector2 ${this.x} ${this.y}`;		

	}
	
	get [Symbol.toStringTag]() {
		return `Vector2 ${this.x} ${this.y}`;
	}

	scMul(scalar) {
		this.#x *= scalar;
		this.#y *= scalar;
		return this;
	}

	vMul(vector) {
		throw ('vMul not implemented', this);
	}

	add(vector) {
		this.#x += vector.x;
		this.#y += vector.y;
		return this;
	}

	sub(vector) {
		this.#x -= vector.x;
		this.#y -= vector.y;
		return this;
	}

	normalize() {
		this.scMul(1.0 / this.length);
		return this;
	}

	get length() {
		return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
	}
}

export class Vector3 extends Vector2 {
	#z = 0;
	get z() { return this.#z };

	constructor(x = 0, y = 0, z = 0) {
		super(x, y);
		this.#z = z;
		// this.prototype.toString = () => `Vector3 ${this.x} ${this.y} ${this.z}`;
	}

	get [Symbol.toStringTag]() {
		return `Vector3 ${this.x} ${this.y} ${this.z}`;
	}


	scMul(scalar) {
		super.scMul(scalar);
		this.#z *= scalar;
		return this;
	}

	vMul(vector) {
		throw ('vMul not implemented', this);
	}

	add(vector) {
		super.add(vector);
		if (vector.z)
			this.#z += vector.z;
		return this;
	}

	normalize() {
		this.scMul(1.0 / this.length);
		return this;
	}

	get length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
}