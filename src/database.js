import { isToday } from 'date-fns';
import todoFactory from './todo';
import projectFactory from './project';

const database = () => {
  const todos = {};
  const projects = {};
  let latestTodoIDNum = 0;
  let latestProjectIDNum = 10000;
  // Creates a project based on some user input for name and color. Returns project object.
  const createProject = (name, tagColor) => {
    // Need a way to choose/assign idNums for projects and avoid collissions (hash?)
    latestProjectIDNum += 1;
    const idNum = latestProjectIDNum;
    const newProject = projectFactory(name, tagColor, idNum);
    projects[idNum] = newProject;
    return newProject;
  };
  // Deletes project as well as all todo items belonging to project. Will return true if project
  // is found, and false if project is not found. Return value is not related to finding or deleting
  // todo items.
  const deleteProject = (searchIDNum) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const i in todos) {
      if (todos[i].getProjectID() === searchIDNum) {
        delete todos[i];
      }
    }
    if (searchIDNum in projects) {
      delete projects[searchIDNum];
      return true;
    }
    return false;
  };
  // Creates a todo based on user input for name, description, duedate, and projectID.
  // Returns todo object.
  const createTodo = (name, description, dueDate, projectID, priority) => {
    // Need a way to choose/assign idNums for todos and avoid collissions (hash?)
    latestTodoIDNum += 1;
    const idNum = latestTodoIDNum;
    const newTodo = todoFactory(name, description, dueDate, projectID, priority, idNum);
    todos[idNum] = newTodo;
    return newTodo;
  };
  // Deletes todo item. Will return true if todo is found, and false if todo is not found.
  const deleteTodo = (searchIDNum) => {
    if (searchIDNum in todos) {
      delete todos[searchIDNum];
      return true;
    }
    return false;
  };
  const assignTodoToProject = (projectID, todoID) => {
    if (todoID in todos) {
      todos[todoID].setProjectID(projectID);
      return true;
    }
    return false;
  };
  const findProjectByID = (searchIDNum) => {
    if (searchIDNum in projects) {
      return projects[searchIDNum];
    }
    return false;
  };
  const findTodoByID = (searchIDNum) => {
    if (searchIDNum in todos) {
      return todos[searchIDNum];
    }
    return false;
  };
  const findTodosByProjectID = (projectID) => {
    const theseTodos = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const i in todos) {
      if (todos[i].getProjectID() === projectID) {
        theseTodos.push(todos[i]);
      }
    }
    return theseTodos;
  };
  const findTodosDueToday = () => {
    const theseTodos = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const i in todos) {
      if (isToday(todos[i].getDueDate())) {
        theseTodos.push(todos[i]);
      }
    }
    return theseTodos;
  };
  const findTodosPriority = () => {
    const theseTodos = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const i in todos) {
      if ((todos[i].getPriority()) === true) {
        theseTodos.push(todos[i]);
      }
    }
    return theseTodos;
  };
  return {
    todos,
    projects,
    createProject,
    deleteProject,
    createTodo,
    deleteTodo,
    assignTodoToProject,
    findProjectByID,
    findTodoByID,
    findTodosByProjectID,
    findTodosDueToday,
    findTodosPriority,
  };
};

export default database;
