import { throwIfUndefined } from "../tools/classUtils.js";

export class Animator {
	#animations;
	constructor(animations) {
		this.#animations = throwIfUndefined(animations, 'animations');
	}

	#animTimer;

	#curFrame;
	get curFrame() { return this.#curFrame }

	#curAnimation;
	start(name, speed = 1, forsed = false) {

		const anim = this.#animations[name];
		if (!forsed && this.#curAnimation == anim) return;
		console.log(`start ${name}`);

		if (this.#animTimer) {
			console.log(`clearTimeout ${this.#animTimer}`);
			clearTimeout(this.#animTimer);
		}

		console.log('start', anim);
		this.#curAnimation = anim;

		const loop = () => {
			this.#curFrame = anim.next;
			if (speed != 0)
				this.#animTimer = setTimeout(loop, this.#curFrame.delay / speed);
		}

		loop();
	}
}