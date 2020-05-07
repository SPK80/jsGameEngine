export function throwIfNotInstanceof(object, clas) {
	if (!(object instanceof clas))
		throw (`${object} must extend class ${clas}`);
}

export function throwIfUndefined(object, name = '') {
	if (object == undefined)
		throw (`${name} undefined`);
}