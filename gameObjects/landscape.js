import { GameObject } from "./gameObject.js";
import { Vector2, Vector3 } from "../geometry/vectors.js";
import { throwIfNotInstance } from "../tools/utils.js";
import { ImageDrawing } from "./drawings/drawings.js";
import { InfinitImageDrawing } from "./drawings/infinitImageDrawing.js";

export class Landscape extends GameObject {
	constructor(name, image, render) {
		throwIfNotInstance(image, Image);
		super(name, render, new Vector3(), new Vector2(image.width, image.height));
		this.decorateDrawing(ImageDrawing, image);
	}
}

export class InfinitLandscape extends GameObject {
	constructor(name, image, render) {
		super(name, render, new Vector3(), new Vector2(image.width, image.height));
		this.decorateDrawing(InfinitImageDrawing, image);
	}
}