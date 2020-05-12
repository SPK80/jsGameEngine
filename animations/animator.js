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
		const anim = this.#animations[name];
		console.log('start', anim);
		if (this.#animTimer) clearInterval(this.#animTimer);
		this.#animTimer = setInterval(
			() => {
				this.#curFrame = anim.next;
				// console.log(this.#curFrame);

			},
			anim.delay);
	}
}