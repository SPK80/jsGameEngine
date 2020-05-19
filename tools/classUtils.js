export function throwIfNotInstance(object, _class) {
	if (!(object instanceof _class))
		throw (`${object} must extend ${_class}`);
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

///returns copy object with injected field
///not change input object
export function inject(object, name, value) {
	let _fields = {};
	_fields[name] = value;
	return Object.assign(_fields, object);
}