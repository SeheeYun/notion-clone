export interface BaseComponent {
  attachTo(parents: HTMLElement, position?: InsertPosition): void;
}

export class BaseComponentImpl<T extends HTMLElement> implements BaseComponent {
  protected readonly element: T;
  constructor(elementHtmlStirng: string) {
    const template = document.createElement('template');
    template.innerHTML = elementHtmlStirng;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parents: HTMLElement, position: InsertPosition = 'beforeend') {
    parents.insertAdjacentElement(position, this.element);
  }
}
