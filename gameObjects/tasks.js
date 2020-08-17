import { throwIfNotInstance } from "../tools/utils.js";

export class TasksRunStack {
	#tasks = [];

	get curent() {
		return this.#tasks[this.#tasks.length - 1];
	}

	constructor(idleTask) {
		if (idleTask)
			this.push(idleTask);
	}

	push(newTask) {
		throwIfNotInstance(newTask, Task);
		this.#tasks.push(newTask);
	}

	pop() {
		return this.#tasks.pop();
	}

	run(args) {
		let _result;
		const _curent = this.curent;
		try {
			_result = _curent.next(args);
		}
		catch{ }

		if (!_curent.hasNext) {
			if (this.#tasks.length > 1)
				this.#tasks.pop();
			else
				throw (`Task ${_curent.name} is damaged!`, _curent);
		}
		return _result;
	}
}

export class Task {
	#name;
	get name() { return this.#name }
	#func;

	constructor(name, func) {
		this.#name = name;
		this.#func = func;
	}

	#hasNext = true;
	get hasNext() { return this.#hasNext }

	finish() { this.#hasNext = false }

	#result;
	get result() { return this.#result }

	#catched = false;
	get catched() { return this.#catched }


	next(args) { //if returns undifined then Task is finished
		if (!this.#hasNext) return;

		try {
			this.#result = this.#func(args, this);
			return this.#result;
		}
		catch {
			this.finish();
			this.#catched = true;
			return;
		}
	}
}

// class IdleTask extends Task {
// 	constructor(animState, animNames) {
// 		super('idle', () => {
// 			const animName = animNames[Math.floor(Math.random() * animNames.length)];
// 			animState.set(animName);
// 			setTimeout(this.#loop, Math.random() * 3 + 1);
// 		});
// 	}
// }
