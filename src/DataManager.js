import database from './database';

// Test console logs -> object {} - A - B - 10001 - 10002 - [(...)] - [(...)]
const dataTest = database();
const projectA = dataTest.createProject('A', 'blue');
const projectB = dataTest.createProject('B', 'green');

const A1Date = new Date(2023, 4, 4);
const todoA1 = dataTest.createTodo('A1', 'A first todo for project A', A1Date, projectA.getIDNum(), false);
const A2Date = new Date(2023, 4, 4);
const todoA2 = dataTest.createTodo('A2', 'A 2nd todo for project A', A2Date, projectA.getIDNum(), true);
const A3Date = new Date(2023, 4, 7);
const todoA3 = dataTest.createTodo('A3', 'A third todo for project A', A3Date, projectA.getIDNum(), true);
const B1Date = new Date(2023, 4, 4);
const todoB1 = dataTest.createTodo('B1', 'A first todo for project B', B1Date, projectB.getIDNum(), true);

const data = dataTest;
export default data;

// Load data from Local Storage??
