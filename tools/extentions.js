export function numberRound() {
	Number.prototype.round = function (places = 0) {
		if (places == 0) return Math.round(this);
		const p = Math.pow(10, places);
		return Math.round(this * p + Number.EPSILON) / p;
	}

};

export function numberParseHex() {
	Number.prototype.parseHex = function (value) {
		return parseInt(value.replace('#', ''), 16);
	}
}


export function arrayLast() {
	Array.prototype.last = function () {
		return this[this.length - 1];
	}
}