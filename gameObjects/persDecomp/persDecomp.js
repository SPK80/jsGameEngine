import { arrayLast } from "../tools/extentions.js";

import { Vector2, Vector3 } from "../geometry/vectors.js";
import { inject } from "../../tools/utils.js";

arrayLast();

class State {
	#commander;

	get() {
		const lastAction = this.#commander.accepted.last();
		if (lastAction == undefined) return 'idle';
		else return lastAction;
	}

	constructor(commander) {
		this.#commander = throwIfNotInstance(commander, Commander);
	}

	update() {
		this.#commander.update();
	}
}

class View {
	get frame() { throw ('frame must be implemented') }
}

class AnimatedDrawing {
	#view;

	constructor(render, image, body, view) {
		super(render, image, body);
		this.#view = throwIfNotInstance(view, View);
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

const comm = new Commander(input);
const pers = new Drawing(
	new Moving(comm, new Body(100, 150, 100, 100)),
	new Animating(new State(comm), animations),
	render,
	image
);