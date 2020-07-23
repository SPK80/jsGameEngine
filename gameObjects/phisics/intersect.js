// import { BodyDecorator } from "../bodies.js";
import { CompositeDecorator } from "../composite.js";
import { InteractGameObject } from "../common.js";

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
		const objects = this.get().filter(obj => obj instanceof InteractGameObject);
		// console.log(objects);
		objects.forEach(obj1 => {
			objects.forEach(obj2 => {
				if (obj2 != obj1 &&
					this.#intersectDetect(obj1.body, obj2.body)) {
					obj1.interaction(obj2);
					obj2.interaction(obj1);
				}
			});
		});
	}
}