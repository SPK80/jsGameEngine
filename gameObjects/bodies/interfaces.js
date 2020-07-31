import { IUpdating } from "../common.js"

export class IBody extends IUpdating {
	get pos() { throw ('pos() must be implemented') }
	get size() { throw ('size() must be implemented') }
}