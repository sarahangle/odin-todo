import './style.css';
import todoFactory from './todo';
import projectFactory from './project';

const todo1 = todoFactory('Laundry', 'Do my laundry', '1/1/1');
console.log(todo1.getPriority());
todo1.togglePriority();
console.log(todo1.getPriority());
