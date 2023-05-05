import './style.css';
import { makeSidebar, clickToday } from './SidebarManager';
import { initializeData } from './DataManager';

const toggleNav = () => {
  if (document.getElementById('sidebar').style.width === '0px') {
    document.getElementById('sidebar').style.width = '250px';
  } else {
    document.getElementById('sidebar').style.width = '0px';
  }
};

const deleteLocalStorage = () => {
  localStorage.clear();
  initializeData();
  makeSidebar();
  clickToday();
};

// Build header, sidebar, and open content box for actual displayed tasks
const makeHeader = () => {
  const headerNode = document.getElementById('header');
  headerNode.appendChild(document.createElement('button'));
  headerNode.lastChild.classList.add('material-icons', 'openbtn');
  headerNode.lastChild.onclick = toggleNav;
  headerNode.lastChild.textContent = 'menu';
  headerNode.appendChild(document.createElement('button'));
  headerNode.lastChild.classList.add('material-icons', 'openbtn');
  headerNode.lastChild.onclick = deleteLocalStorage;
  headerNode.lastChild.textContent = 'folder_delete';
  headerNode.appendChild(document.createElement('div'));
  headerNode.lastChild.setAttribute('id', 'logo');
  headerNode.lastChild.textContent = 'My TODO';
};

initializeData();
makeHeader();
makeSidebar();
clickToday();
