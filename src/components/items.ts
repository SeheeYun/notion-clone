import { BaseComponent, BaseComponentImpl } from './baseComponent.js';

export interface Composable {
  addChild(child: BaseComponent): void;
}

type OnRemoveLinstener = () => void;

export class ItemContainer extends BaseComponentImpl<HTMLLIElement> {
  private removeListener?: OnRemoveLinstener;
  constructor() {
    super(`<li class="item">
    <button class="delete-button">✖️</button>
  </li>`);
    const deleteBtn = this.element.querySelector(
      '.delete-button'
    )! as HTMLButtonElement;
    deleteBtn.onclick = () => {
      this.removeListener && this.removeListener();
    };
  }

  addChild(child: BaseComponent) {
    child.attachTo(this.element);
  }

  setOnRemoveLinstener(listener: OnRemoveLinstener) {
    this.removeListener = listener;
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
    item.setOnRemoveLinstener(() => item.removeFrom(this.element));
  }
}
