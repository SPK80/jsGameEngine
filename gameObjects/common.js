export class IUpdating {
	update() { throw ('update() must be implemented') };
}

export class IDrawing extends IUpdating {
	get render() { throw ('render must be implemented') };
	get body() { throw ('body must be implemented') };
}

export class IBody extends IUpdating {
	get pos() { throw ('pos() must be implemented') };
	get size() { throw ('size() must be implemented') };
	get state() { throw ('state() must be implemented') };
}

export class IGameObject extends IUpdating {
	get name() { throw ('name must be implemented') };
}