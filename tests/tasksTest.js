import { TasksExecutor, Task } from "../gameObjects/tasks.js";

const tasks = new TasksExecutor(new Task('idle', (args) => {
	console.log('idle', args);
	return 'idle';
}));

tasks.update(0);

let i = 4;
tasks.push(new Task('t1', (args) => {
	console.log('t1:', i--);
	if (i > 0)
		return 't1';
	else return;
}));

tasks.update(1);
tasks.update(2);
tasks.update(3);
tasks.update(4);
tasks.update(5);
tasks.update(6);