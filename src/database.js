import todoFactory from './todo';
import projectFactory from './project';

const database = () => {
  const todos = {};
  const projects = [];
  // Creates a project based on some user input for name and color. Returns project object.
  const createProject = (name, tagColor) => {
    // Need a way to choose/assign idNums for projects and avoid collissions (hash?)
    const idNum = 0;
    const newProject = projectFactory(name, tagColor, idNum);
    projects.push(newProject);
    return newProject;
  };
  // Deletes project as well as all todo items belonging to project. Will return true if project
  // is found, and false if project is not found. Return value is not related to finding or deleting
  // todo items.
  const deleteProject = (searchIDNum) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const j in todos) {
      if (todos[j].projectID === searchIDNum) {
        delete todos[j];
      }
    }
    for (let i = 0; i < projects.length; i += 1) {
      if (projects[i].idNum === searchIDNum) {
        projects.splice(i, 1);
        return true;
      }
    }
    return false;
  };
  const createTodo = () => {

  };
  const deleteTodo = () => {

  };
  const assignTodoToProject = () => {

  };
  const findProjectByID = () => {

  };
  const findTodosByID = () => {

  };
  const findTodosByDueDate = () => {

  };
  const sortTodos = () => {

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
    findTodosByID,
    findTodosByDueDate,
    sortTodos,
  };
};
