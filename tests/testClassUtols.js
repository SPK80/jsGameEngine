import { inject } from "../tools/classUtils.js";

const obj = {
	fld : 1
}
console.log(inject(obj, 'fldName', 12));
console.log(obj);
