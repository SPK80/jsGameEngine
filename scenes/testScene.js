import { Vector3, Vector2 } from "../geometry/vectors.js";
import { FrameScene, RedRect } from "./scene.js";
import { TaskInput } from "../inputs/TaskInput";

export class TestScene extends FrameScene {
	constructor(renderEngine, inputEngine) {

		super(renderEngine, inputEngine);
this.decorateInput(TaskInput, )

		const redRect = new RedRect(new Vector3(100, 200, 1), new Vector2(150, 100));
		this.addObject(redRect);
	}
}