export default class Items {
  private element: HTMLUListElement;
  constructor() {
    this.element = document.createElement('ul');
    this.element.setAttribute('class', 'items');
  }

  attachTo(parents: HTMLElement, position: InsertPosition = 'beforeend') {
    parents.insertAdjacentElement(position, this.element);
  }
}
