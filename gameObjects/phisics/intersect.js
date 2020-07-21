import { throwIfNotInstance } from "../../tools/utils";
import { IBody } from "../common";

class RectIntersect {
	constructor(shape) {
		const includesX = function (x) {
			return (x > shape.x && x < shape.right());
		}

		const includesY = function (y) {
			return (y > shape.y && y < shape.buttom());
		}

		this.includes = function (x, y) {
			return includesX(x) && includesY(y);
		}


		// this.intersectRect = function(obj) {
		//     return ((this.includesX(obj.x) || insideX(shape.x)) && (shape.includesY(obj.y) || insideY(shape.y)))
		// }
	}
}

export class IntersectComposite extends CompositeDecorator {
#intersectDetect;
update(){
//TODO: Apply intersectDetect foreach IntersectBody
//If true, call body1.intersect(body2); body2.intersect(body1)
}
}

export class IntersectBody extends Body {
#behavior;
intersect(body){
this.#behavior(this, body)
}
}
