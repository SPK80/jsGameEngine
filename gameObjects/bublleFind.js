import { throwIfUndefined } from "../classUtils.js";

/// callback  - function(index) returns value by index for comparison  
export function bublleFindIndex(findVal, length, callback) {
	const _MAXDEEP = 10000;
	let _deep = 0;
	throwIfUndefined(callback);
	throwIfUndefined(findVal);
	throwIfUndefined(length);

	const find = (b, e) => {
		_deep++;
		if (_deep > _MAXDEEP) throw (`${_deep} its too deep!`);

		if (e - b < 2) return e;
		const c = Math.floor(e + b) / 2;
		if (findVal >= callback(b) && findVal <= callback(c))
			return find(b, c);
		else
			return find(c, e);
	};

	if (findVal >= callback(length - 1)) return length;
	if (findVal <= callback(0)) return 0;

	return find(0, length - 1);
}

// function find(b, e) {
// 	// console.log(b, e);
// 	_deep++;
// 	if (e - b < 2) return e;
// 	const c = Math.floor(e + b) / 2;
// 	if (_deep > _MAXDEEP) throw (_deep);
// 	if (_findVal >= _callback(b) && _findVal <= _callback(c))
// 		return find(b, c);
// 	else
// 		return find(c, e);
// }

// export function bublleFind(array, val) {
// 	const last = array.length - 1;
// 	if (val >= array[last]) return last + 1;
// 	if (val <= array[0]) return 0;
// 	return find(array, 0, last, val);
// }

// function find(array, b, e, val) {
// 	console.log(b, e);
// 	deep++;
// 	if (e - b < 2) return e;

// 	const c = Math.floor(e + b) / 2;

// 	if (deep > maxDeep) throw (deep);

// 	if (val >= array[b] && val <= array[c])
// 		return find(array, b, c, val);
// 	else
// 		return find(array, c, e, val);
// }