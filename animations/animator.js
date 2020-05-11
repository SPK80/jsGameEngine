import { throwIfUndefined } from "../tools/classUtils";

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
		if (this.#animTimer) clearInterval(this.#animTimer);
		this.#animTimer = setInterval(
			() => this.#curFrame = anim.next,
			anim.delay);
	}
}