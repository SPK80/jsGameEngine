// import { BodyDecorator } from "../bodies.js";
import { CompositeDecorator } from "../composite.js";
import { InteractGameObject, IUpdating } from "../common.js";

export class IntersectSceneDec extends UpdatingDecorator {
	#predicate;

	constructor(predicate, object) {
		super(object);
		this.#predicate = predicate;
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
					this.#predicate(obj1.body, obj2.body)) {
					object._callEvent('intersect', { object1: obj1, object2: obj2 });
				}
			});
		});
	}
}

export class UpdatingDecorator extends IUpdating {
	#object;
	update() { this.#object.update(); }

	constructor(object) {
		super();
		this.#object = throwIfNotInstance(object, IUpdating);
	}
}