// components/Section.js
class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // Render items in natural order (first item at the top)
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this._container.append(element);
    });
  }

  addItem(element) {
    this._container.prepend(element); // New items go to the top
  }
}

export default Section;
