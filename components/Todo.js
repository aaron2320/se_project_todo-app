// components/Todo.js
class Todo {
  constructor(data, selector, handleCheckboxChange, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheckboxChange = handleCheckboxChange;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDelete(this._data.completed);
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._handleCheckboxChange(this._data.completed);
    });
  }

  _generateCheckBoxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._dueDate = new Date(this._data.date);
    this._tododate = this._todoElement.querySelector(".todo__date");
  }

  _generateDueDateEl() {
    console.log("Due date in Todo.js:", this._dueDate); // Debug
    if (!isNaN(this._dueDate.getTime())) {
      this._tododate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    } else {
      this._tododate.textContent = "Due: Not set";
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    console.log("Setting todo name in Todo.js:", this._data.name); // Debug
    todoNameEl.textContent = this._data.name; // Directly set the name

    this._generateCheckBoxEl();
    this._generateDueDateEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
