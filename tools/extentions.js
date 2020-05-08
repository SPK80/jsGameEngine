
export function all() {
	Number.prototype.round = function (places = 0) {
		if (places == 0) return Math.round(this);
		const p = Math.pow(10, places);
		return Math.round(this * p + Number.EPSILON) / p;
	}
	Number.prototype.parseHex = function (value) {
		return parseInt(value.replace('#', ''), 16);
	}
};

all();