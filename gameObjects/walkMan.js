export class walkMan extends GameObject {
	#phase = 0;
	constructor(x, y, ) {
		super({
			x: x == undefined ? 100 : x,
			y: y == undefined ? 100 : y,
		});
	}
	
	draw(render) {
		this.#phase ++;
		if ()
	}

}