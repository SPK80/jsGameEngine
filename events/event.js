export class Event {
	#name = '';
	get name() { return this.#name }

	#callbacks = [];

	constructor(name, firstCallback) {
		if (name) this.#name = name;
		if (firstCallback)
			this.subscribe(firstCallback);
	}

	subscribe(callback) {
		this.#callbacks.push(callback);
		return () => { unsubscribe(callback) };
	}

	unsubscribe(callback) {
		const i = this.#callbacks.indexOf(callback);
		delete this.#callbacks[i];
	}

	call(args) {
		this.#callbacks.forEach(callback => {
			const result = callback(this.#name, args);
			if (result)
				this.unsubscribe(callback);
		});
	}
}