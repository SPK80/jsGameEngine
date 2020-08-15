import { ISource } from "../../inputs/input.js";
import { Vector2 } from "../../geometry/vectors.js";
import { GameEvent } from "../events/gameEvent.js";
import { MoveStates } from "../personage.js";

export class PulsesSource extends ISource {
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

export class PulsesEvent extends GameEvent {
	#input;

	constructor(input) {
		super('pulses');

		this.#input = input;
		this.#input.onIncoming(() => { this._update() });
	}

	_update() {
		const actions = this.#input.get();
		if (actions && actions.length > 0) {
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
			// console.log(this, pulses);
			this.call(pulses);
		}
	}
}