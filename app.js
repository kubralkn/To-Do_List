const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#inputTask");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const searchTodo = document.querySelector("#todoSearch");
const video = document.querySelector(".all");

let todos = [];

runEvent();

function runEvent() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", removeAllTodo);
  searchTodo.addEventListener("keyup", filterTodo);
}

// Storagedeki verileri arayüzde de gösterme
function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function addTodo(e) {
  const inputText = addInput.value;
  if ((inputText == null, inputText == "")) {
    showAlert("warning", "Please do not leave blank!");
  } else {
    //arayüz
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success", "Added to your list!");
  }
  e.preventDefault();
}

//arayüz
function addTodoToUI(newTodo) {
  //eleman ekler.
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa-solid fa-xmark";
  i.style = "color: black";
  // elemanları iç içe geçirir.
  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  //işlem bittikten sonra input alanını temizler.
  addInput.value = "";
}

//storage
function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  const div = document.createElement("div");
  div.className = ` mt-2 p-2 text-center alert alert-${type}`;
  div.textContent = message;
  firstCardBody.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 1000);
}

function removeTodoToUI(e) {
  if (e.target.className === "fa-solid fa-xmark") {
    //arayüzden silme
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    //storageden silme
    removeTodoToStorage(todo.textContent);
  }
}

function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

//tüm todoları silme
function removeAllTodo(e) {
  const allTodoList = document.querySelectorAll(".list-group-item");
  if (allTodoList.length > 0) {
    allTodoList.forEach(function (todo) {
      todo.remove();
    });
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    showAlert("success", "Successfully deleted.");
  } else {
    showAlert("warning", "There must be at least one To Do!");
  }
}
function filterTodo(e) {
  const valueTodo = e.target.value.toLowerCase().trim();
  const todoList = document.querySelectorAll(".list-group-item");

  if (todoList.length > 0) {
    todoList.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(valueTodo)) {
        todo.setAttribute("style", "display : block");
      } else {
        todo.setAttribute("style", "display : none !important");
      }
    });
  }
}
