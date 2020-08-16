import { throwIfNotInstance } from "../tools/utils.js";

export class TasksExecutor {
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

	update(args) {
		let result;
		try {
			result = this.curent.next(args);
		}
		catch{ }

		if (!result) {
			if (this.#tasks.length > 1)
				this.#tasks.pop();
			else
				throw ('idleTask is damaged!', this.curent);
		}
		return result;
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

	#finished = false;
	next(args) { //if returns undifined then Task is finished
		if (this.#finished) return;

		try {
			const result = this.#func(args);
			if (!result) this.#finished = true;
		}
		catch {
			this.#finished = true;
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
