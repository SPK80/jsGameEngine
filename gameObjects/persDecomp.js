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

class Animated extends View {

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

class Drawed {
	#view;
	#spaceObject;

	constructor(view, spaceObject) {
		this.#view = throwIfNotInstance(view, View);
		this.#spaceObject = throwIfNotInstance(spaceObject, SpaceObject);
	}

	update() {
		const frame = this.#view.frame;
		if (frame) {
			this.#render.tile({
				image: this.#image,
				absoluteTilePos: true,
				x: this.#spaceObject.pos.x,
				y: this.#spaceObject.pos.y,
				width: this.#spaceObject.size.x,
				height: this.#spaceObject.size.y,
				tileX: frame.x,
				tileY: frame.y,
				tileWidth: frame.wi,
				tileHeight: frame.he
			});
		}
	}
}

class SpaceObject {

	constructor(x, y, wi, he) {
		this.#pos = new Vector3(x, y, 0);
		this.#size = new Vector3(wi, he, 0);
	}

	#pos = new Vector3();
	get pos() { return this.#pos };

	#size = new Vector3();
	get size() { return this.#size };
}

class Movable extends SpaceObject {

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

		_move();
	}
}

class Personage {
	#spaceObject;

	constructor(x, y) {
		this.#spaceObject = new SpaceObject(x, y, 0, 0);
	}

}

const pers = new Animated(
	new Movable(100, 100, 32, 32, new Commander(input)),
	render,
	image,
	animations);