export class AbstractRender {
	#children = [];
	// newChild(x, y, wi, he) {
	// 	this.#children.push(new LocalRender(x, y, wi, he, this));
	// }

	clear() { throw ('not implemented'); }
	clear(x, y, wi, he) { throw ('not implemented'); }
	rect(x, y, wi, he, color, fill) { throw ('not implemented'); }
	circle(x, y, radius, color, fill) { throw ('not implemented'); }
	text(x, y, text, color, font, fill) { throw ('not implemented'); }
	sprite(x, y, wi, he, image) { throw ('not implemented'); }
	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) { throw ('not implemented'); }
}
