import './style.css';
import todoFactory from './todo';
import projectFactory from './project';
import database from './database';

const todo1 = todoFactory('Laundry', 'Do my laundry', '1/1/1');
console.log(todo1.getPriority());
todo1.togglePriority();
console.log(todo1.getPriority());

const data = database();
data.createProject('A', 'blue');
data.createProject('B', 'green');
console.log(data.projects);
console.log(data.projects[0].getName());
console.log(data.projects[1].getName());
