// pages/index.js
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todosList = document.querySelector(".todos__list");

// Initialize TodoCounter
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Todo generation with counter updates
const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
    (wasCompleted) => {
      todoCounter.updateTotal(false);
      if (wasCompleted) todoCounter.updateCompleted(false);
    }
  );
  return todo.getView();
};

// Section for rendering todos
const todoSection = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      const todoElement = generateTodo(item);
      return todoElement;
    },
    containerSelector: ".todos__list",
  },
  ".todos__list"
);

// Popup with form for adding todos
const addTodoPopup = new PopupWithForm("#add-todo-popup", (formData) => {
  console.log("Received form data in index.js:", formData); // Debug
  let date;
  if (formData.date && formData.date.trim() !== "") {
    const [year, month, day] = formData.date.split("-");
    date = new Date(year, month - 1, day); // month is 0-based in JavaScript
  } else {
    date = new Date();
  }
  const newTodo = {
    name:
      formData.name && formData.name.trim() !== ""
        ? formData.name
        : "Unnamed Task",
    date: date,
    id: uuidv4(),
    completed: false,
  };
  console.log("New todo created:", newTodo); // Debug
  const todoElement = generateTodo(newTodo);
  todoSection.addItem(todoElement);
  todoCounter.updateTotal(true);
  newTodoValidator.resetValidation(); // Reset the form and disable the button after submission
  addTodoPopup.close();
});

// Form validator
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

// Event listeners
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open(); // Open popup without resetting the form
});

// Initial render
todoSection.renderItems();
addTodoPopup.setEventListeners();
