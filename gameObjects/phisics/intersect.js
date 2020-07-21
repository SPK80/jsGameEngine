import { Body } from "../bodies.js";
import { CompositeDecorator } from "../composite.js";

export class IntersectComposite extends CompositeDecorator {
	#intersectDetect;

	constructor(intersectDetect) {
		this.#intersectDetect = intersectDetect;
	}

	update() {
		//Apply intersectDetect foreach IntersectBody
		//If true, call body1.interaction(body2); body2.interaction(body1)
		const bodies = this.get().filter(body => body instanceof IntersectBody);
		bodies.forEach(body1 => {
			bodies.forEach(body2 => {
				if (body2 != body1 &&
					this.#intersectDetect(body1, body2)) {
					body1.interaction(body2);
					body2.interaction(body1);
				}
			});
		});
	}
}

export class IntersectBody extends Body {
	#behavior;

	constructor(behavior) {
		this.#behavior = behavior;
	}

	interaction(body) {
		this.#behavior(this, body)
	}
}
