import { UpdateDecorator } from "./interface.js";

export class Drawing extends UpdateDecorator {
	#render;
	#image;
	#pos;
	#size;

	constructor(render, image, object) {
		super(object);

		//dependences
		this.#pos = throwIfUndefined(this.object.property('pos'), 'pos');
		this.#size = throwIfUndefined(this.object.property('size'), 'pos');

		this.#render = throwIfNotInstance(render, Render);
		this.#image = throwIfNotInstance(image, Image);
	}

	update() {
		this.#render.sprite(
			this.#pos.x,
			this.#pos.y,
			this.#size.x,
			this.#size.y,
			this.#image
		);
	}
}

export class AnimDrawing extends Drawing {
	constructor(render, image, object) {
		super(render, image, object);
	}

	update() {
		const frame = this.#view.get();
		if (frame) {
			this.#render.tile({
				image: this.#image,
				absoluteTilePos: true,
				x: this.#body.pos.x,
				y: this.#body.pos.y,
				width: this.#body.size.x,
				height: this.#body.size.y,
				tileX: frame.x,
				tileY: frame.y,
				tileWidth: frame.wi,
				tileHeight: frame.he
			});
		}
	}
}