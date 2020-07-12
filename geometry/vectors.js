export class Vector2 {
	#x = 0;
	get x() { return this.#x };

	#y = 0;
	get y() { return this.#y };

	constructor(x = 0, y = 0) {
		this.#x = x;
		this.#y = y;
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
		this.scMul(1.0 / this.length());
		return this;
	}

	length() {
		return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
	}
}

export class Vector3 extends Vector2 {
	#z = 0;
	get z() { return this.#z };

	constructor(x = 0, y = 0, z = 0) {
		super(x, y);
		this.#z = z;
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
		this.scMul(1.0 / this.length());
		return this;
	}

	get length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
}

export class IVector {
	get x() { };
	get y() { };




}

export class Vector2Decorator {


}

export class ShiftedVector2 {
	#shift;
	#vector;

	constructor(shift, vector) {
		this.#vector = throwIfNotInstance(vector, Vector2);
		this.#shift = throwIfNotInstance(shift, Vector2);
	}

	get x() {
		return this.#vector.x + this.#shift.x;
	}

	add(vector) {
		this.#vector.add(vector);
		return this;
	}


}