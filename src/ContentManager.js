import { data, sendAllToLocalStorage } from './DataManager';

let current = 0;

const clearContent = () => {
  const contentNode = document.getElementById('content');
  contentNode.innerHTML = '';

  const modalCard = document.getElementById('modal-card2');
  modalCard.innerHTML = '';
};

const toggleCollapsible = (evt) => {
  evt.currentTarget.parentNode.nextElementSibling.classList.toggle('active');
};

const newTodoSubmit = (evt) => {
  evt.preventDefault(); // Prevent page refresh
  const todoProjectID = document.getElementById('newTodoForm').getAttribute('data-projectID');
  const newTodo = data.createTodo(document.querySelector('#newTodoForm #name').value, document.querySelector('#newTodoForm #description').value, new Date(`${document.querySelector('#newTodoForm #duedate').value}T00:00`), parseInt(todoProjectID, 10), false);

  openCurrent();

  // Change form defaults back to empty
  document.querySelector('#newTodoForm #name').value = '';
  document.querySelector('#newTodoForm #description').value = '';
  document.querySelector('#newTodoForm #duedate').value = '';

  // Hide modal
  const modal = document.getElementById('modal2');
  modal.style.display = 'none';

  sendAllToLocalStorage();
};

const togglePriority = (evt) => {
  evt.preventDefault();
  const btnNode = evt.target;
  const todoNode = btnNode.parentNode.parentNode;
  const todo = data.findTodoByID(todoNode.getAttribute('data-todoID'));
  todo.togglePriority();

  openCurrent();
  sendAllToLocalStorage();
};

const toggleDone = (evt) => {
  evt.preventDefault();
  const btnNode = evt.target;
  const todoNode = btnNode.parentNode.parentNode;
  const todo = data.findTodoByID(todoNode.getAttribute('data-todoID'));
  todo.toggleDone();

  openCurrent();
  sendAllToLocalStorage();
};

const deleteTodo = (evt) => {
  evt.preventDefault();
  const btnNode = evt.target;
  const todoNode = btnNode.parentNode.parentNode;
  const todo = data.findTodoByID(todoNode.getAttribute('data-todoID'));
  data.deleteTodo(todo.getIDNum());

  openCurrent();
  sendAllToLocalStorage();
};

const createCardForTodo = (todo) => {
  const todoNode = document.createElement('div');
  todoNode.classList.add('todoCard');
  todoNode.setAttribute('data-todoID', todo.getIDNum());

  const todoHeaderNode = document.createElement('div');
  todoHeaderNode.classList.add('todo-header');
  todoHeaderNode.appendChild(document.createElement('input'));
  todoHeaderNode.lastChild.classList.add('todo-check');
  todoHeaderNode.lastChild.setAttribute('type', 'checkbox');
  todoHeaderNode.lastChild.setAttribute('name', 'todo-check');
  todoHeaderNode.lastChild.checked = todo.getIsDone();
  todoHeaderNode.lastChild.onclick = toggleDone;
  todoHeaderNode.appendChild(document.createElement('div'));
  todoHeaderNode.lastChild.classList.add('todo-name');
  todoHeaderNode.lastChild.textContent = todo.getName();
  if (todo.getIsDone()) { todoHeaderNode.lastChild.style.textDecoration = 'line-through'; }
  // Add Event Listener
  todoHeaderNode.lastChild.addEventListener('click', toggleCollapsible);
  todoHeaderNode.appendChild(document.createElement('button'));
  todoHeaderNode.lastChild.classList.add('todo-icon-btn');
  todoHeaderNode.lastChild.classList.add('todo-priority');
  todoHeaderNode.lastChild.classList.add('material-icons');
  todoHeaderNode.lastChild.onclick = togglePriority;
  todoHeaderNode.lastChild.textContent = 'star';
  if (todo.getPriority()) { todoHeaderNode.lastChild.style.color = 'yellow'; }
  todoHeaderNode.appendChild(document.createElement('button'));
  todoHeaderNode.lastChild.classList.add('todo-icon-btn');
  todoHeaderNode.lastChild.classList.add('todo-delete');
  todoHeaderNode.lastChild.classList.add('material-icons');
  todoHeaderNode.lastChild.onclick = deleteTodo;
  todoHeaderNode.lastChild.textContent = 'delete';

  const todoCollapsibleNode = document.createElement('div');
  todoCollapsibleNode.classList.add('todo-collapsible');
  todoCollapsibleNode.appendChild(document.createElement('div'));
  todoCollapsibleNode.lastChild.classList.add('todo-duedate');
  todoCollapsibleNode.lastChild.textContent = `Due Date: ${todo.getDueDate().toDateString()}`;
  todoCollapsibleNode.appendChild(document.createElement('div'));
  todoCollapsibleNode.lastChild.classList.add('todo-description');
  todoCollapsibleNode.lastChild.textContent = `Description: ${todo.getDescription()}`;

  todoNode.appendChild(todoHeaderNode);
  todoNode.appendChild(todoCollapsibleNode);

  // Append to main content node
  const content = document.getElementById('content');
  content.appendChild(todoNode);
};

const addTodoColors = () => {
  const todoNodeList = document.getElementById('content').childNodes;
  todoNodeList.forEach((todoNode) => {
    if (todoNode.tagName === 'DIV') {
      const todoID = parseInt(todoNode.getAttribute('data-todoID'), 10);
      const projectID = data.findTodoByID(todoID).getProjectID();
      const todoColor = data.findProjectByID(projectID).getTagColor();
      // eslint-disable-next-line no-param-reassign
      todoNode.style.background = todoColor;
    }
  });
};

const createNewTodoBtn = (projectID) => {
  const newTodoBtn = document.createElement('button');
  newTodoBtn.setAttribute('id', 'newTodoBtn');
  newTodoBtn.textContent = 'Add New Todo';
  document.getElementById('content').appendChild(newTodoBtn);

  // MODAL
  const modal = document.getElementById('modal2');
  const modalBtn = document.getElementById('newTodoBtn');

  // When the user clicks on the button, open the modal
  modalBtn.onclick = function turnOnModal() {
    modal.style.display = 'block';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function turnOffModal(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  // New Project Form
  const form = document.createElement('form');
  form.setAttribute('data-projectID', projectID);
  form.setAttribute('id', 'newTodoForm');
  form.appendChild(document.createElement('div'));
  form.firstChild.classList.add('title');
  form.firstChild.textContent = 'New Todo';
  form.appendChild(document.createElement('label'));
  form.lastChild.setAttribute('for', 'name');
  form.lastChild.textContent = 'Name';
  form.appendChild(document.createElement('input'));
  form.lastChild.setAttribute('type', 'text');
  form.lastChild.setAttribute('id', 'name');
  form.lastChild.setAttribute('name', 'name');
  form.lastChild.setAttribute('value', '');
  form.appendChild(document.createElement('label'));
  form.lastChild.setAttribute('for', 'description');
  form.lastChild.textContent = 'Description';
  form.appendChild(document.createElement('input'));
  form.lastChild.setAttribute('type', 'text');
  form.lastChild.setAttribute('id', 'description');
  form.lastChild.setAttribute('name', 'description');
  form.lastChild.setAttribute('value', '');
  form.appendChild(document.createElement('label'));
  form.lastChild.setAttribute('for', 'duedate');
  form.lastChild.textContent = 'Due Date';
  form.appendChild(document.createElement('input'));
  form.lastChild.setAttribute('type', 'date');
  form.lastChild.setAttribute('id', 'duedate');
  form.lastChild.setAttribute('name', 'duedate');
  form.lastChild.setAttribute('value', '');
  form.appendChild(document.createElement('input'));
  form.lastChild.setAttribute('type', 'submit');
  form.lastChild.setAttribute('value', 'Create Todo');

  const modalCardNode = document.getElementById('modal-card2');
  modalCardNode.appendChild(form);

  form.addEventListener('submit', newTodoSubmit);
};

const openToday = () => {
  current = 0;
  clearContent();

  const todoList = data.findTodosDueToday();
  todoList.forEach((todo) => createCardForTodo(todo));

  addTodoColors();
};

const openPriority = () => {
  current = 1;
  clearContent();

  const todoList = data.findTodosPriority();
  todoList.forEach((todo) => createCardForTodo(todo));

  addTodoColors();
};

const openProject = (projectID) => {
  current = projectID;
  clearContent();

  const todoList = data.findTodosByProjectID(parseInt(projectID, 10));
  todoList.forEach((todo) => createCardForTodo(todo));

  createNewTodoBtn(projectID);
};

const openCurrent = () => {
  if (current === 0) {
    openToday();
  } else if (current === 1) {
    openPriority();
  } else { openProject(current); }
};

export {
  openToday, openPriority, openProject,
};
