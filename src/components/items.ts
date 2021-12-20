import { BaseComponent, BaseComponentImpl } from './baseComponent.js';

export interface Composable {
  addChild(child: BaseComponent): void;
}

export class ItemContainer extends BaseComponentImpl<HTMLLIElement> {
  constructor() {
    super(`<li class="item">
    <button class="delete-button">✖️</button>
  </li>`);
  }

  addChild(child: BaseComponent) {
    child.attachTo(this.element);
  }
}

export class Items extends BaseComponentImpl<HTMLUListElement> {
  constructor() {
    super(`<ul class="items"></ul>`);
    this.element.addEventListener('click', e => this.removeItem(e));
  }

  addChild(child: BaseComponent) {
    const item = new ItemContainer();
    item.addChild(child);
    item.attachTo(this.element);
  }

  removeItem(e: Event) {
    const target = e.target as HTMLElement;
    if (target.className === 'delete-button') {
      target.parentElement?.remove();
    }
  }
}
