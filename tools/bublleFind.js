// import { throwIfUndefined } from "./classUtils.js";

import { throwIfUndefined } from "./utils.js";

/// callback  - function(index) returns value by index for comparison  
export function bublleFindIndex(findVal, length, itemGetter) {
	throwIfUndefined(itemGetter);
	throwIfUndefined(findVal);
	throwIfUndefined(length);
	if (length == 0) return 0;

	const _MAXDEEP = 100;
	let _deep = 0;

	function find(b, e) {
		// console.log(b, e);
		_deep++;
		if (_deep > _MAXDEEP) throw (`${_deep} its too deep!`);

		if (e - b < 2) return e;
		const c = Math.floor((e + b) / 2);
		if (findVal >= itemGetter(b) && findVal <= itemGetter(c))
			return find(b, c);
		else
			return find(c, e);
	};

	if (findVal >= itemGetter(length - 1)) return length;
	if (findVal <= itemGetter(0)) return 0;

	return find(0, length - 1);
}