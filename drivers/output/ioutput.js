import { IDriver } from "../idriver.js"

export class IOutput extends IDriver {
	send(args) { throw ('get must be implemented') }
}

export class CanvasOutput extends IOutput {

	#canvasRender;

	constructor(wi, he, bkColor, scale = 1) {
		this.#canvasRender = new CanvasRender(wi, he, bkColor, scale);
	}

	send(args) { 
		args[0]
	}
}