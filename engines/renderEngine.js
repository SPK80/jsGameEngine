import { DriverEngine } from "./engine.js";

export class RenderEngine extends DriverEngine {
	constructor(driver, frameRate = 60) {
		super(driver, 1000 / frameRate);
	}
}