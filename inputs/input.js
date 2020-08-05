export class Input {
	get() { throw ('get must be implemented') }
	subscribe(callback) { throw ('subscribe must be implemented') }
}

export class EnptyInput extends Input {
	get() { return [] }
	subscribe(callback) { }
}

