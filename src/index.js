import './style.css';
import todoFactory from './todo';

const todo1 = todoFactory('Laundry', 'Do my laundry', '1/1/1');
console.log(todo1.getName());
todo1.setName('Wash Laundry');
console.log(todo1.getName());
