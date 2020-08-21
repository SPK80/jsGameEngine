import { DriverEngine } from "./engine.js";
import { KeyboardDriver } from "../inputs/keyboardDriver.js";

export class RenderEngine extends DriverEngine {
	constructor(driver, frameRate = 60) {
		super(driver, 1000 / frameRate);
	}
}

export class InputEngine extends DriverEngine {
	constructor(driver, frameRate = 10) {
		super(driver, 1000 / frameRate);
	}
}

export class KeyboardEngine extends InputEngine {
	constructor(frameRate = 10) {
		super(new KeyboardDriver(), 1000 / frameRate);
	}
}

