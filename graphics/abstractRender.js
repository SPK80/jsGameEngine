export class AbstractRender {
	clear() { throw ('not implemented'); }
	clear(x, y, wi, he) { throw ('not implemented'); }
	rect(x, y, wi, he, color, fill) { throw ('not implemented'); }
	circle(x, y, radius, color, fill) { throw ('not implemented'); }
	text(x, y, text, color, font, fill) { throw ('not implemented'); }
	sprite(x, y, wi, he, image) { throw ('not implemented'); }
	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) { throw ('not implemented'); }

	get width() { throw ('not implemented'); }
	get height() { throw ('not implemented'); }
}
// export class PositionRender extends AbstractRender{
// 	#pos = new Vector2();
// 	#posStack = [];

// 	pushPos(pos) {
// 		this.#posStack.push(this.#pos);
// 		this.#pos = new Vector2(this.#pos.x, this.#pos.y).add(pos);
// 	}

// 	popPos() {
// 		this.#pos = this.#posStack.pop();
// 	}
// }
