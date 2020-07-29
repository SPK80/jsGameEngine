import { IUpdating } from "../common.js"

export class IPlugin extends IUpdating {
	init(bus) { throw ('init must be implemented') }
}

export class IPlugBus extends IUpdating {
	plugin(object) { throw ('plugin must be implemented') }
}