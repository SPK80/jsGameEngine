export class IUpdating {
	update() { throw ('update() must be implemented') };
}

export class IDrawing extends IUpdating {
	get render() { throw ('render must be implemented') }
	get body() { throw ('body must be implemented') }
}

export class IBody extends IUpdating {
	get pos() { throw ('pos() must be implemented') }
	get size() { throw ('size() must be implemented') }
}

export class IGameObject extends IUpdating {
	get name() { throw ('name must be implemented') }
	get body() { throw ('body must be implemented') }
}

export class InteractGameObject extends IGameObject {
	interaction(body) { throw ('interaction must be implemented') }
}

export class IComposite extends IUpdating {
	add(item) { throw ('add must be implemented') }
	get(name) { throw ('get must be implemented') }
	remove(item) { throw ('remove must be implemented') }
}


export class IScene extends IUpdating {
	addObject(object) { throw ('addObject must be implemented') }
	removeObject(object) { throw ('removeObject must be implemented') }
	getObject(name) { throw ('getObject must be implemented') }
}

export class IEventsScene extends IScene {
	listenEvent(eventName, callback) { throw ('listenEvent must be implemented') }
	callEvent(eventName, args) { throw ('callEvent must be implemented') }
}