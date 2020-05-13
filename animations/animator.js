import { throwIfUndefined } from "../tools/classUtils.js";

export class Animator {
	#animations;
	constructor(animations) {
		this.#animations = throwIfUndefined(animations, 'animations');
	}

	#animTimer;

	#curFrame;

	get curFrame() { return this.#curFrame }

	start(name) {
		if (this.#animTimer) clearTimeout(this.#animTimer);
		const anim = this.#animations[name];

		console.log('start', anim);

		const loop = () => {
			this.#curFrame = anim.next;
			// console.log(this.#curFrame);
			setTimeout(loop, this.#curFrame.delay);
		}

		loop();

	}
}