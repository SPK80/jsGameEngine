import { Vector2 } from "../../geometry/vectors.js";
import { UpdateDecorator, UpdateInterface } from "./interface.js";
import { throwIfUndefined } from "../../tools/utils.js";

export class Moving extends UpdateDecorator {

	#speed = 1;
	get speed() { return this.#speed };

	#direction = new Vector2(0, 0);
	get direction() { return this.#direction };

	#input;
	#pos;
	constructor(input, object) {
		super(object)
		//dependences
		this.#pos = throwIfUndefined(this.object.property('pos'), 'pos');

		this.#input = throwIfNotInstance(input, Input);
	}

	update() {
		this.#direction = new Vector2(0, 0);
		const commands = this.#input.get();
		commands.forEach(comm => {
			if (comm == 'moveRight') this.#direction.add(new Vector2(1, 0));
			if (comm == 'moveLeft') this.#direction.add(new Vector2(-1, 0));
			if (comm == 'moveDown') this.#direction.add(new Vector2(0, 1));
			if (comm == 'moveUp') this.#direction.add(new Vector2(0, -1));
		});
		if (Math.abs(this.#direction.x) < 1 && Math.abs(this.#direction.y) < 1) return;
		this.#direction.normalize().mul(this.#speed);

		this.#pos.add(this.#direction);
	}
}