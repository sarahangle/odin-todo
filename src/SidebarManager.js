import { data, sendAllToLocalStorage } from './DataManager';
import {
  openToday, openPriority, openProject,
} from './ContentManager';

const projectBarSetup = () => {
  const projectListNode = document.getElementById('ProjectList');
  projectListNode.innerHTML = '';

  // eslint-disable-next-line no-restricted-syntax
  for (const project of Object.values(data.projects)) {
    const newProjectLi = document.createElement('li');
    newProjectLi.classList.add('sidebarBtn');
    newProjectLi.setAttribute('data-projectID', project.getIDNum());
    newProjectLi.appendChild(document.createElement('span'));
    newProjectLi.lastChild.classList.add('material-icons');
    newProjectLi.lastChild.style.color = project.getTagColor();
    newProjectLi.lastChild.textContent = 'circle';
    newProjectLi.appendChild(document.createElement('div'));
    newProjectLi.lastChild.textContent = project.getName();

    projectListNode.appendChild(newProjectLi);
  }
};

const newProjectSetup = () => {
  // MODAL
  const modal = document.getElementById('modal1');
  const modalBtn = document.getElementById('newProjectBtn');

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
  form.setAttribute('id', 'newProjectForm');
  form.appendChild(document.createElement('div'));
  form.firstChild.classList.add('title');
  form.firstChild.textContent = 'New Project';
  form.appendChild(document.createElement('input'));
  form.lastChild.setAttribute('type', 'text');
  form.lastChild.setAttribute('id', 'name');
  form.lastChild.setAttribute('name', 'name');
  form.lastChild.setAttribute('value', '');
  form.appendChild(document.createElement('input'));
  form.lastChild.setAttribute('type', 'color');
  form.lastChild.setAttribute('id', 'tagColor');
  form.lastChild.setAttribute('name', 'tagColor');
  form.lastChild.setAttribute('value', '#000000');
  form.appendChild(document.createElement('input'));
  form.lastChild.setAttribute('type', 'submit');
  form.lastChild.setAttribute('value', 'Create Project');

  const modalCardNode = document.getElementById('modal-card1');
  modalCardNode.innerHTML = '';
  modalCardNode.appendChild(form);
};

const clearButtonStyle = (node) => {
  node.classList.remove('active');
};

const addButtonStyle = (node) => {
  node.classList.add('active');
};

const clearSidebarStyles = () => {
  const todayBtnNode = document.getElementById('todayBtn');
  clearButtonStyle(todayBtnNode);

  const priorityBtnNode = document.getElementById('priorityBtn');
  clearButtonStyle(priorityBtnNode);

  const projectNodes = document.getElementById('ProjectList').childNodes;
  projectNodes.forEach(clearButtonStyle);
};

const clickToday = () => {
  clearSidebarStyles();
  openToday();
  const todayBtnNode = document.getElementById('todayBtn');
  addButtonStyle(todayBtnNode);
};

const clickPriority = () => {
  clearSidebarStyles();
  openPriority();
  const priorityBtnNode = document.getElementById('priorityBtn');
  addButtonStyle(priorityBtnNode);
};

const clickProject = (evt) => {
  clearSidebarStyles();
  openProject(evt.currentTarget.getAttribute('data-projectID'));
  addButtonStyle(evt.currentTarget);
};

const addProjectButtonEventListener = (node) => {
  node.addEventListener('click', clickProject);
};

const newProjectSubmit = (evt) => {
  evt.preventDefault(); // Prevent page refresh
  const newProject = data.createProject(document.querySelector('#newProjectForm #name').value, document.querySelector('#newProjectForm #tagColor').value);

  // Creating new entry in project list in sidebar
  const projectListNode = document.getElementById('ProjectList');
  const newProjectLi = document.createElement('li');
  newProjectLi.classList.add('sidebarBtn');
  newProjectLi.setAttribute('data-projectID', newProject.getIDNum());
  newProjectLi.appendChild(document.createElement('span'));
  newProjectLi.lastChild.classList.add('material-icons');
  newProjectLi.lastChild.style.color = newProject.getTagColor();
  newProjectLi.lastChild.textContent = 'circle';
  newProjectLi.appendChild(document.createElement('div'));
  newProjectLi.lastChild.textContent = newProject.getName();
  projectListNode.appendChild(newProjectLi);

  // Change form defaults back to empty
  document.querySelector('#newProjectForm #name').value = '';
  document.querySelector('#newProjectForm #tagColor').value = '#000000';

  // Hide modal
  const modal = document.getElementById('modal1');
  modal.style.display = 'none';

  // Add event listener for new project list entry in sidebar
  addProjectButtonEventListener(newProjectLi);

  // 'Click' new project
  clearSidebarStyles();
  openProject(newProject.getIDNum());
  addButtonStyle(newProjectLi);

  sendAllToLocalStorage();
};

const makeEventListeners = () => {
  const todayBtnNode = document.getElementById('todayBtn');
  todayBtnNode.addEventListener('click', clickToday);

  const priorityBtnNode = document.getElementById('priorityBtn');
  priorityBtnNode.addEventListener('click', clickPriority);

  const projectNodes = document.getElementById('ProjectList').childNodes;
  projectNodes.forEach(addProjectButtonEventListener);

  const newProjectNode = document.getElementById('newProjectForm');
  newProjectNode.addEventListener('submit', newProjectSubmit);
};

const makeSidebar = () => {
  const sidebarNode = document.getElementById('sidebar');
  sidebarNode.style.width = '250px';

  projectBarSetup();
  newProjectSetup();
  makeEventListeners();
  sendAllToLocalStorage();
};

export {
  makeSidebar, clickToday, newProjectSubmit,
};
