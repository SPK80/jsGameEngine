import { IDriver } from "../idriver.js"

export class IInput extends IDriver {
	getData() { throw ('get must be implemented') }
}