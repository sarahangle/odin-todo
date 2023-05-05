import './style.css';
import { makeSidebar, clickToday } from './SidebarManager';

const toggleNav = () => {
  if (document.getElementById('sidebar').style.width === '0px') {
    document.getElementById('sidebar').style.width = '250px';
  } else {
    document.getElementById('sidebar').style.width = '0px';
  }
};

// Build header, sidebar, and open content box for actual displayed tasks
const makeHeader = () => {
  const headerNode = document.getElementById('header');
  headerNode.appendChild(document.createElement('button'));
  headerNode.lastChild.classList.add('material-icons', 'openbtn');
  headerNode.lastChild.onclick = toggleNav;
  headerNode.lastChild.textContent = 'menu';
  headerNode.appendChild(document.createElement('div'));
  headerNode.lastChild.setAttribute('id', 'logo');
  headerNode.lastChild.textContent = 'My TODO';
};

makeHeader();
makeSidebar();
clickToday();
