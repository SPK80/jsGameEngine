import { BodyDecorator } from "../bodies.js";
import { CompositeDecorator } from "../composite.js";

export class IntersectComposite extends CompositeDecorator {
	#intersectDetect;

	constructor(intersectDetect, object) {
		super(object);
		this.#intersectDetect = intersectDetect;
	}

	update() {
		super.update();
		//Apply intersectDetect foreach IntersectBody
		//If true, call body1.interaction(body2); body2.interaction(body1)
		const bodies = this.get().filter(body => body instanceof InteractBody);
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

export class InteractBody extends BodyDecorator {
	#behavior;

	constructor(behavior, object) {
		super(object);
		this.#behavior = behavior;
	}

	interaction(body) {
		this.#behavior(this, body)
	}
}
