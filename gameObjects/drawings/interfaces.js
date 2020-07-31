import { IUpdating } from "../common.js"

export class IDrawing extends IUpdating {
	get render() { throw ('render must be implemented') }
	get body() { throw ('body must be implemented') }
}