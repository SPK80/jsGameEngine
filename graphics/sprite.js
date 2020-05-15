export class ImageLoader {
	#image = null;
	get image() { return this.#image }
	#loaded = false;
	get loaded() { return this.#loaded }
	get width() { return this.#image.width }
	get height() { return this.#image.height }

	constructor(src) {
		_this = this;
		this.#image.addEventListener("load", function () {
			_this.#loaded = true;
		}, false);
		this.#image.src = src;
	}
}