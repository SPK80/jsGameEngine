import { arrayLast } from "../tools/extentions.js";

import { Vector2, Vector3 } from "../geometry/vectors.js";

arrayLast();

class Commander {
	#input;

	#ignoreRepeating = true;
	#accepted = [];
	get accepted() { return this.#accepted; }

	constructor(input, ignoreRepeating = true) {
		this.#input = input;
		this.#ignoreRepeating = ignoreRepeating;
	}

	update() {
		_filter = (command) => {
			const includes = this.#accepted.includes(command);
			if (this.#ignoreRepeating && includes) return;

			this.#accepted.push(command);
		}

		const commands = this.#input.get();
		if (commands && commands.length > 0)
			commands.forEach(com => {
				_filter(com);
			});
		else _filter('idle');
	}
}

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

class Animating extends View {

	#animator;
	// #speed = 1;
	#state;

	constructor(state, animations) {
		this.#animator = new Animator(animations);
		this.#state = throwIfNotInstance(image, State);
	}

	get frame() {
		return this.#animator.curFrame;
	}

	update() {
		this.#state.update();
		this.#animator.start(this.#state.get());
	}
}

class Drawing {
	#view;
	#body;
	#render;
	#image;

	constructor(body, view, render, image) {
		this.#view = throwIfNotInstance(view, View);
		this.#body = throwIfNotInstance(body, Body);
		this.#render = throwIfNotInstance(render, Render);
		this.#image = throwIfNotInstance(image, Image);
	}

	update() {
		const frame = this.#view.frame;
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

class Body {

	constructor(x, y, wi, he) {
		this.#pos = new Vector3(x, y, 0);
		this.#size = new Vector3(wi, he, 0);
	}

	#pos = new Vector3();
	get pos() { return this.#pos };

	#size = new Vector3();
	get size() { return this.#size };
}

class MovingBody extends Body {

	#speed = 1;
	get speed() { return this.#speed };
	#direction = new Vector2(0, 0);
	get direction() { return this.#direction };

	#commander;

	constructor(x, y, wi, he, commander) {
		super(x, y, wi, he);
		this.#commander = throwIfNotInstance(commander, Commander);
		this.#speed = speed;
	}

	update() {
		const _move = () => {
			this.#direction = new Vector2(0, 0);

			this.#commander.accepted.forEach(comm => {
				if (comm == 'moveRight') this.#direction.add(new Vector2(1, 0));
				if (comm == 'moveLeft') this.#direction.add(new Vector2(-1, 0));
				if (comm == 'moveDown') this.#direction.add(new Vector2(0, 1));
				if (comm == 'moveUp') this.#direction.add(new Vector2(0, -1));
			});
			if (Math.abs(this.#direction.x) < 1 && Math.abs(this.#direction.y) < 1) return;

			this.#direction.normalize().mul(this.#speed);
			this.pos.add(this.#direction);
		}
		this.#commander.update();
		_move();
	}
}

const comm = new Commander(input);
const pers = new Drawing(
	new MovingBody(100, 150, 100, 100, comm),
	new Animating(new State(comm), animations),
	render,
	image
);