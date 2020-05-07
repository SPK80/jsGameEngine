// export function bublleFind(array, condition) {
// 	if (condition(array, 0, array.length - 1))
// 		return find(array, 0, array.length - 1, condition);
// }
const maxDeep = 20;
let deep = 0;
// function find(array, b, e, condition) {
// 	deep++;
// 	if (e == b) return e;
// 	const c = Math.floor(e - b) / 2;
// 	if (deep > maxDeep) throw (b, e, c);

// 	console.log(b, e, c);
// 	if (condition(array, b, c)) {
// 		return find(array, b, c, condition);
// 	} else {
// 		return find(array, c, e, condition);
// 	}
// }

export function bublleFind(array, val) {
	return find(array, 0, array.length - 1, val);
}

function find(array, b, e, val) {
	deep++;

	if (e - b < 2) return b;
	const c = Math.floor(e + b) / 2;
	console.log(b, e, c);

	if (deep > maxDeep) throw (deep);

	if (val >= array[b] && val <= array[c])
		return find(array, b, c, val);
	else
		return find(array, c, e, val);

}