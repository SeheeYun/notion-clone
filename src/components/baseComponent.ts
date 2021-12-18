export default class BaseComponent {
  protected element;
  constructor(elementHtmlStirng: string) {
    const template = document.createElement('template');
    template.innerHTML = elementHtmlStirng;
    this.element = template.content.firstElementChild! as HTMLElement;
  }

  attachTo(parents: HTMLElement, position: InsertPosition = 'beforeend') {
    parents.insertAdjacentElement(position, this.element);
  }
}
