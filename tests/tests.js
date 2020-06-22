class Pred {
	_foo() {
		console.log('Pred._foo');
	}

	foo() {
		this._foo();
	}
}

class Ch extends Pred {
	#bar = false;
	// foo() {
	// 	super.foo();
	// 	this.#bar = true;
	// 	console.log('Ch.foo', this.#bar);
	// }
	_foo() {
		super._foo();
		this.#bar = true;

		console.log('Ch._foo');

	}
}

const ch = new Ch();
ch.foo();