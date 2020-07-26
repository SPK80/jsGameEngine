import { Input } from "../../inputs/input.js";
import { Vector2 } from "../../geometry/vectors.js";
import { MoveStates } from "../state.js";

export class PulsesSource extends Input {
	#input;
	constructor(input) {
		super();
		this.#input = input;
	}

	get() {
		const actions = this.#input.get();

		const pulses = [];
		actions.forEach(act => {
			if (act == MoveStates.moveRight)
				pulses.push(new Vector2(1, 0));
			if (act == MoveStates.moveLeft)
				pulses.push(new Vector2(-1, 0));
			if (act == MoveStates.moveDown)
				pulses.push(new Vector2(0, 1));
			if (act == MoveStates.moveUp)
				pulses.push(new Vector2(0, -1));
		});
		return pulses;
	}
}