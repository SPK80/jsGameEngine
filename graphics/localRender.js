import { throwIfNotInstance, throwIfNotNumber } from "../tools/utils.js";
import { AbstractRender } from "./abstractRender.js";

export class LocalRender extends AbstractRender {
	#x = 0;
	#y = 0;
	#width = 200;
	#height = 200;
	#parent;
	constructor(parent, x, y, wi, he) {
		super();
		this.#x = throwIfNotNumber(x);
		this.#y = throwIfNotNumber(y);
		this.#width = throwIfNotNumber(wi);
		this.#width = throwIfNotNumber(he);
		this.#parent = throwIfNotInstance(parent, AbstractRender);
	}
	///Implement AbstractRender
	clear(x, y, wi, he) {
		this.#parent.clear(x + this.#x, y + this.#y, wi, he);
	}
	clear() {
		this.#parent.clear(this.#x, this.#y, this.#width, this.#height);
	}
	rect(x, y, wi, he, color, fill) {
		this.#parent.rect(x + this.#x, y + this.#y, wi, he, color, fill);
	}
	circle(x, y, radius, color, fill) {
		this.#parent.circle(x + this.#x, y + this.#y, radius, color, fill);
	}
	text(x, y, text, color, font, fill) {
		this.#parent.text(x + this.#x, y + this.#y, text, color, font, fill);
	}
	sprite(x, y, wi, he, image) {
		this.#parent.sprite(x + this.#x, y + this.#y, wi, he, image);
	}
	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		this.#parent.tile(x + this.#x, y + this.#y, wi, he, tiX, tiY, tiWi, tiHe, image);
	}
}
