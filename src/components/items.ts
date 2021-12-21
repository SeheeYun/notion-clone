import { BaseComponent, BaseComponentImpl } from './baseComponent.js';

export interface Composable {
  addChild(child: BaseComponent): void;
}

type OnRemoveLinstener = () => void;

interface ItemContainer extends BaseComponent, Composable {
  setOnRemoveLinstener(listener: OnRemoveLinstener): void;
}

type ItemContainerConstructor = {
  new (): ItemContainer;
};

export class ItemContainerImpl
  extends BaseComponentImpl<HTMLLIElement>
  implements ItemContainer
{
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
  constructor(private itemConstructor: ItemContainerConstructor) {
    super(`<ul class="items"></ul>`);
  }

  addChild(child: BaseComponent) {
    const item = new this.itemConstructor();
    item.addChild(child);
    item.attachTo(this.element);
    item.setOnRemoveLinstener(() => item.removeFrom(this.element));
  }
}
