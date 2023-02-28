import todoFactory from './todo';
import projectFactory from './project';

const database = () => {
  const todos = [];
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
    for (let j = 0; j < todos.length; j += 1) {
      if (todos[j].projectID === searchIDNum) {
        projects.splice(j, 1);
        j -= 1;
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
  return {
    todos,
    projects,
    createProject,
    deleteProject,
    createTodo,
    deleteTodo,
    assignTodoToProject,
  };
};

const dataFilter = (() => {
  const findProjectByID = (projects, idNum) => {};
  const findTodosByID = (todos, idNum) => {};
  const findTodosByDueDate = (dueDate) => {};
})();

const dataSort = (() => {
  const sortTodos = () => {};
})();
