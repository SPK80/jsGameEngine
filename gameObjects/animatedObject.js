import { GameObject } from "./gameObject.js";
import { throwIfUndefined } from "../tools/classUtils.js";

export class AnimatedObject extends GameObject {
	#animations;

	#image = new Image();
	#imageLoaded = false;

	constructor(name, x, y, image, animations) {

		super({
			name: name,
			x: x == undefined ? 100 : x,
			y: y == undefined ? 100 : y,
			z: 1
		});

		this.#animations = throwIfUndefined(animations, 'animations');

		if (image == undefined) {
			const _this = this;
			this.#image.addEventListener("load", function () {
				_this.#imageLoaded = true;
			}, false);
			this.#image.src = 'tiles.png';
		}
		else {
			this.#image = image;
			this.#imageLoaded = true;
		}
	}

	update(drivers) {

		if (!this.#imageLoaded) return;

		drivers.render.tile({
			image: this.#image,
			x: this.x,
			y: this.y,
			width: this.#width,
			height: this.#height,
			tileWidth: this.#tileWidth,
			tileHeight: this.#tileHeight,
			tileX: tx,
			tileY: this.#direction
		});

		// drivers.render.text({
		// 	text: this.#state,
		// 	x: this.x,
		// 	y: this.y,
		// });
	}
}