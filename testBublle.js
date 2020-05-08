import { bublleFindIndex } from "./gameObjects/bublleFind.js";
const arr = [1, 5, 5, 10, 11];
const n = 4;

console.log(arr, n);
const r = bublleFindIndex(n, arr.length, (i) => arr[i]);

console.log(`[${r}]:${arr[r]}`);
arr.splice(r, 0, n);
console.log(arr);
