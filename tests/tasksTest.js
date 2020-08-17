import { TasksRunStack, Task } from "../gameObjects/tasks.js";

const tasks = new TasksRunStack(new Task('idle', (args) => {
	console.log('idle', args);
	return 'idle';
}));

console.log('0: ' + tasks.run(0));

let i = 2;
tasks.push(new Task('t1', (args) => {
	console.log('  t1:');
	t.finish(); //how to finish and return result?
	return 't1';

}));

console.log('1: ' + tasks.run(1));
console.log('2: ' + tasks.run(2));
console.log('3: ' + tasks.run(3));

// let j = 2;
// tasks.push(new Task('t2', (args, t) => {
// 	console.log('    t2:', j--);
// 	if (j > 0)
// 		return 't2';
// 	else t.finish();
// }));

// console.log('0: ' + tasks.run(3));
// console.log('0: ' + tasks.run(4));
// console.log('0: ' + tasks.run(5));
// console.log('0: ' + tasks.run(6));
// console.log('0: ' + tasks.run(7));

// tasks.push(new Task('t3', (args) => {
// 	console.log('t3');
// 	throw ('');
// }));

// console.log('0: ' + tasks.run(8));
// console.log('0: ' + tasks.run(9));