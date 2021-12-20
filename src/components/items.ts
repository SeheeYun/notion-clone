import { BaseComponent, BaseComponentImpl } from './baseComponent.js';

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
  }

  addChild(child: BaseComponent) {
    const item = new ItemContainer();
    item.addChild(child);
    item.attachTo(this.element);
  }
}
