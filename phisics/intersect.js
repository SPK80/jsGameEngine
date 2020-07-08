import { throwIfNotInstance } from "../tools/utils";
import { IBody } from "../gameObjects/common";

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