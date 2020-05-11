import { throwIfUndefined } from "../tools/classUtils.js";
import { Animation } from "./animation.js";

export class ChainAnimation extends Animation {
	#frame;
	#firstFrame;

	constructor(firstFrame) {
		super();
		this.#firstFrame = throwIfUndefined(firstFrame, 'firstFrame');
		this.#frame = this.#firstFrame;
	}

	get nextFrame() {
		const nextFrame = this.#frame.next;
		if (nextFrame) this.#frame = nextFrame;
		return nextFrame;
	}

	addFrame(x, y, wi, he, delay, first) {
		const frame;
		if (first)
			frame = this.#firstFrame;
		else
			frame = this.#frame;
		frame.addNext(x, y, wi, he, delay)
	}
}