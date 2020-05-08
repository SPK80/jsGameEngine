export function throwIfNotInstance(object, _class) {
	if (!(object instanceof _class))
		throw (`${object} must extend class ${_class}`);
	return object;
}

export function throwIfUndefined(object, name = '') {
	if (object == undefined)
		throw (`${name} undefined`);
	return object;
}

export function defaultIfUndefined(object, def) {
	if (object == undefined) return def;
	return object;
}