import { bublleFind } from "./gameObjects/bublleFind.js";
const arr = [1, 5, 6, 10, 11];
const n = 0;

const cond = function (arr, b, e) {
	return n >= arr[b] && n <= arr[e];
}
console.log(arr, n);
const r = bublleFind(arr, n);
console.log(r);
