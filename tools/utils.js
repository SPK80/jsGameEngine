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

export function isValidNumber(value) {
	return (Number(value) != NaN);
}

export function throwIfNotNumber(value) {
	if (!isValidNumber(value))
		throw (`${value} is not valid Numder`);
	return value;
}

export function isValidHex(value) {
	if (value[0] != '#') return false;
	return (parseInt(value.replace('#', ''), 16) != NaN)
}

export function throwIfNotHex(value) {
	if (!isValidHex(value))
		throw (`${value} is not valid Hex`);
	return value;
}

///returns copy object with injected field
///not change input object
export function inject(object, name, value) {
	let _fields = {};
	_fields[name] = value;
	return Object.assign(_fields, object);
}

export function clone(object) {
	return Object.assign({}, object);
}
