import { TasksExecutor, Task } from "../gameObjects/tasks.js";

const tasks = new TasksExecutor(new Task('idle', (args) => {
	console.log('idle', args);
	return 'idle';
}));

tasks.update();
tasks.update(1);
tasks.update(2);
tasks.update(3);