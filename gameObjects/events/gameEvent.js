export class GameEvent {
	#name = '';
	get name() { return this.#name }

	#callbacks = [];

	constructor(name, firstCallback) {
		this.#name = name;
		if (firstCallback)
			this.subscribe(firstCallback);
	}

	subscribe(callback) {
		this.#callbacks.push(callback);
	}

	unsubscribe(callback) {
		const i = this.#callbacks.indexOf(callback);
		delete this.#callbacks[i];
	}

	call(args) {
		this.#callbacks.forEach(callback => {
			if (callback(args))
				this.unsubscribe(callback);
		});
	}
}