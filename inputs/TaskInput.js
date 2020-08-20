export class KeybToTaskMapper {
	#input;
	#actionsMap;

	constructor(actionsMap, input) {
		this.#input = input;
		this.#actionsMap = actionsMap;
	}

	get() {
		// const keys = this.#input.get()
		// 	.map(key => this.#map[key])
		// 	.filter(v => v);
		const keys = this.#input.get();
		const task = this.#actionsMap.find(keys);
		return [task];
	}
}

class KeysToTasksMap {
	#tasks = {};
	set(name, keys) {
		this.#tasks[name] = keys.slice();
	}
	get(name) {
		return this.#tasks[name];
	}

	find(keys) {		
		for (taskName in this.#tasks) {
			const taskKeys = this.#tasks[taskName];
			if (taskKeys.every(taskKey => keys.some((key) => key == taskKey)))
				return taskName;

		}
	}
}

// class ActionKeys {
// 	#name;
// 	get name() { return this.#name }

// 	#keys = [];
// 	get keys() { return this.#keys.slice() }

// 	constructor(name, keys) {
// 		this.#name = name;
// 		this.#keys.push(...keys);
// 	}
// }