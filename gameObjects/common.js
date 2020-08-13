export class IUpdating {
	update() { throw ('update() must be implemented') };
}

export class IGameObject extends IUpdating {
	get name() { throw ('name must be implemented') }
	get body() { throw ('body must be implemented') }
	get drawing() { throw ('drawing must be implemented') }
	delete() { throw ('delete must be implemented') }
}

export class IComposite extends IUpdating {
	add(item) { throw ('add must be implemented') }
	get(name) { throw ('get must be implemented') }
	remove(item) { throw ('remove must be implemented') }
}