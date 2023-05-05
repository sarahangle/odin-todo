/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import database from './database';

// eslint-disable-next-line import/no-mutable-exports
let data;

const todoParams = (todo) => [todo.getName(), todo.getDescription(), todo.getDueDate().toString(), todo.getProjectID(), todo.getPriority(), todo.getIDNum(), todo.getIsDone()];

const projectParams = (project) => [project.getName(), project.getTagColor(), project.getIDNum()];

const sendAllToLocalStorage = () => {
  const todos = Object.values(data.todos);
  const todosParams = [];
  todos.forEach((todo) => { todosParams.push(todoParams(todo)); });
  localStorage.setItem('todos', JSON.stringify(todosParams));

  const projects = Object.values(data.projects);
  const projectsParams = [];
  projects.forEach((project) => { projectsParams.push(projectParams(project)); });
  localStorage.setItem('projects', JSON.stringify(projectsParams));

  localStorage.setItem('latestProjectIDNum', JSON.stringify(data.getLatestProjectID()));
  localStorage.setItem('latestTodoIDNum', JSON.stringify(data.getLatestTodoID()));

  console.log(data);
  console.log(localStorage);
};

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
      // everything except Firefox
      && (e.code === 22
        // Firefox
        || e.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || e.name === 'QuotaExceededError'
        // Firefox
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && storage
      && storage.length !== 0
    );
  }
}

const loadFromLocalStorage = () => {
  data = database();
  const todos = JSON.parse(localStorage.getItem('todos'));
  const projects = JSON.parse(localStorage.getItem('projects'));

  todos.forEach((todoParam) => {
    data.reconstituteTodo(todoParam);
  });

  projects.forEach((projectParam) => {
    data.reconstituteProject(projectParam);
  });

  data.setLatestProjectID(parseInt(JSON.parse(localStorage.getItem('latestProjectIDNum')), 10));
  data.setLatestTodoID(parseInt(JSON.parse(localStorage.getItem('latestTodoIDNum')), 10));
};

const initializeData = () => {
  if (storageAvailable('localStorage') && localStorage.getItem('todos')) {
    loadFromLocalStorage();
  } else {
    data = database();
  }
};

export {
  initializeData, data, sendAllToLocalStorage,
};
