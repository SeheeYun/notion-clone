export interface BaseComponent {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
}

export class BaseComponentImpl<T extends HTMLElement> implements BaseComponent {
  protected readonly element: T;
  constructor(elementHtmlStirng: string) {
    const template = document.createElement('template');
    template.innerHTML = elementHtmlStirng;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'beforeend') {
    parent.insertAdjacentElement(position, this.element);
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentNode) {
      throw new Error('Parent mismatch.');
    }
    parent.removeChild(this.element);
  }
}
