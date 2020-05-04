export function throwIfNotInstanceof(object, clas) {
	if (!(object instanceof clas))
		throw (`${object} must extend class ${clas}`);
}