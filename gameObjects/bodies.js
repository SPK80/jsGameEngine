import { throwIfNotInstance } from "../tools/utils.js";
import { Vector2, Vector3 } from "../geometry/vectors.js";
import { Input } from "../inputs/input.js";
// import { GameObjects } from "./gameObjects.js";
import { Updatable } from "./common.js";
import { bublleFindIndex } from "../tools/bublleFind.js";

export class State extends Input {
	#state = 'idle';

	get() {
		return this.#state;
	}

	set(state) {
		this.#state = state;
	}
}

export class IBody extends Updatable {
	get pos() { throw ('pos() must be implemented') };
	get size() { throw ('size() must be implemented') };
	get state() { throw ('state() must be implemented') };
}

export class Body extends IBody {

	#pos = new Vector3();
	get pos() { return this.#pos }

	#size = new Vector3();
	get size() { return this.#size }

	#state = new State();
	get state() { return this.#state }

	constructor(x, y, wi, he, state) {
		super();
		this.#pos = new Vector3(x, y, 0);
		this.#size = new Vector3(wi, he, 0);
		this.#state = throwIfNotInstance(state, Input);
	}

	update() {
		console.log('Body', this);
	}
}

export class BodyDecorator extends IBody {

	get pos() { return this.#object.pos }
	get size() { return this.#object.size }
	get state() { return this.#object.state }
	#object;

	constructor(object) {
		super();
		this.#object = throwIfNotInstance(object, IBody);
	}

	update() {
		this.#object.update();
	}
}

export class Moving extends BodyDecorator {

	#input;

	#speed = 1;
	get speed() { return this.#speed };

	#direction = new Vector2(0, 0);
	get direction() { return this.#direction };

	constructor(input, object) {
		super(object);
		this.#input = throwIfNotInstance(input, Input);
	}

	update() {
		super.update();

		this.#direction = new Vector2(0, 0);
		const commands = this.#input.get();
		this.state.set(commands[commands.length - 1]);
		commands.forEach(comm => {
			if (comm == 'moveRight') this.#direction.add(new Vector2(1, 0));
			if (comm == 'moveLeft') this.#direction.add(new Vector2(-1, 0));
			if (comm == 'moveDown') this.#direction.add(new Vector2(0, 1));
			if (comm == 'moveUp') this.#direction.add(new Vector2(0, -1));
		});

		if (Math.abs(this.#direction.x) < 1 && Math.abs(this.#direction.y) < 1) return;
		this.#direction.normalize().mul(this.#speed);

		this.pos.add(this.#direction);
	}
}