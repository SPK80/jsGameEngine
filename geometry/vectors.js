class Vector2 {
	x = 0;
	y = 0;
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

}

class Vector3 extends Vector2 {
	z = 0;
	constructor(x, y, z) {
		super(x, y);
		this.z = z;
	}
}