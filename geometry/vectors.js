export class Vector2 {
	x = 0;
	y = 0;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	mul(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	add(vector) {
		this.x += vector2.x;
		this.y += vector2.y;
		return this;
	}

	normalize() {
		const l = Math.sqrt(this.x * this.x + this.y * this.y);
		this.mul(1.0 / l);
		return this;
	}
}

export class Vector3 extends Vector2 {
	z = 0;

	constructor(x, y, z) {
		super(x, y);
		this.z = z;
	}

	mul(scalar) {
		super.mul(scalar);
		this.z *= scalar;
		return this;
	}

	add(vector) {
		super.add(vector);
		this.z += vector2.z;
		return this;
	}

	normalize() {
		const l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		this.mul(1.0 / l);
		return this;
	}
}