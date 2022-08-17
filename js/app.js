//variables
const form = document.querySelector('.add-task'),
  taskList = document.querySelector('.tasks__list'),
  infoTask = document.querySelector('.info'),
  conatiner = document.querySelector('.container'),
  numberTasks = document.querySelector('.pending-tasks'),
  deleteAllBtn = document.querySelector('#clean-all')
let todos = [];

//Event Listeners
eventListeners();
function eventListeners() {
  form.addEventListener('submit', addTodo);
  document.addEventListener('DOMContentLoaded', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    createHTML();
  });
  deleteAllBtn.addEventListener('click', () => {
    todos = [];
    synStorage();
    createHTML();
    numberTasks.innerHTML = todos.length;
  });

}
//Functions
function addTodo(e) {
  e.preventDefault();
  const todo = document.querySelector('#todo').value;
  if (todo === '') {
    showError('Write something!');
    return;
  }
  const todoObject = {
    id: Date.now(),
    todo
  }
  todos = [...todos, todoObject];
  createHTML();
  synStorage();
  form.reset();
  numberTasks.innerHTML = todos.length;
}

function showError(message) {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.classList.add('error');
  conatiner.insertBefore(errorMessage, infoTask);
  setTimeout(() => {
    errorMessage.remove();
  }, 4000)
}
function createHTML() {
  cleanHTML();
  if (todos.length > 0) {
    todos.forEach((item) => {
      const todo = document.createElement('li'),
        text = document.createElement('p'),
        deleteBtn = document.createElement('button'),
        removeIcon = document.createElement('span');
      todo.classList.add('todo');
      deleteBtn.classList.add('deleteBtn');
      removeIcon.classList.add('material-symbols-outlined');
      removeIcon.textContent = 'remove';
      text.textContent = item.todo;
      deleteBtn.appendChild(removeIcon);
      deleteBtn.onclick = () => {
        deleteTodo(item.id);

      }
      todo.appendChild(text);
      todo.appendChild(deleteBtn);
      taskList.appendChild(todo);
    })
  }

}

function cleanHTML() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}
function synStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  synStorage();
  createHTML();
  numberTasks.innerHTML = todos.length;
}