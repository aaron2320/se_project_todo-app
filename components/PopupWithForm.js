// components/PopupWithForm.js
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    console.log("PopupWithForm initialized - Input list:", this._inputList); // Debug
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      console.log(`Input name: ${input.name}, value: ${input.value}`); // Debug
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      console.log("Submitting form data in PopupWithForm:", formData); // Debug
      this._handleFormSubmit(formData);
      this.close(); // Close the popup after submission
    });
  }

  close() {
    super.close();
    this._form.reset(); // Reset the form after closing
  }
}

export default PopupWithForm;
