import { BaseComponent, BaseComponentImpl } from './baseComponent.js';

export interface Composable {
  addChild(child: BaseComponent): void;
}

type OnRemoveLinstener = () => void;

type DragState = 'start' | 'end' | 'enter';

type DragStateListener<T extends BaseComponent> = (
  target: T,
  state: DragState
) => void;

type ItemContainerConstructor = {
  new (): ItemContainer;
};

interface ItemContainer extends BaseComponent, Composable {
  setOnRemoveLinstener(listener: OnRemoveLinstener): void;
  setDragStateListener(listener: DragStateListener<ItemContainer>): void;
  getBoundingRect(): DOMRect;
  toggleClass(): void;
}

export class ItemContainerImpl
  extends BaseComponentImpl<HTMLLIElement>
  implements ItemContainer
{
  private removeListener?: OnRemoveLinstener;
  private dragStateListener?: DragStateListener<ItemContainer>;
  constructor() {
    super(`<li class="item" draggable="true">
      <button class="delete-button">✖️</button>
    </li>`);
    const deleteBtn = this.element.querySelector(
      '.delete-button'
    )! as HTMLButtonElement;
    deleteBtn.onclick = () => {
      this.removeListener && this.removeListener();
    };

    this.element.addEventListener('dragstart', e => {
      this.notifyDragObservers('start');
    });
    this.element.addEventListener('dragend', e => {
      this.notifyDragObservers('end');
    });
    this.element.addEventListener('dragenter', e => {
      this.notifyDragObservers('enter');
    });
  }

  addChild(child: BaseComponent) {
    child.attachTo(this.element);
  }

  setOnRemoveLinstener(listener: OnRemoveLinstener) {
    this.removeListener = listener;
  }

  setDragStateListener(listener: DragStateListener<ItemContainer>) {
    this.dragStateListener = listener;
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  toggleClass() {
    this.element.classList.toggle('drop');
  }
}

export class Items extends BaseComponentImpl<HTMLUListElement> {
  private children = new Set<ItemContainer>();
  private dragTarget?: ItemContainer;
  private dropTarget?: ItemContainer;

  constructor(private itemConstructor: ItemContainerConstructor) {
    super(`<ul class="items"></ul>`);

    this.element.addEventListener('dragover', e => {
      this.onDragOver(e);
    });
    this.element.addEventListener('drop', e => {
      this.onDrop(e);
    });
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
  }
  onDrop(e: DragEvent) {
    e.preventDefault();
    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = e.clientY;
      const srcElement = this.dragTarget.getBoundingRect();
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(
        this.dragTarget,
        dropY < srcElement.y ? 'beforebegin' : 'afterend'
      );
    }
  }

  removeClass() {
    this.element
      .querySelectorAll('.item')
      .forEach(item => item.classList.remove('drop'));
  }

  addChild(child: BaseComponent) {
    const item = new this.itemConstructor();
    item.addChild(child);
    item.attachTo(this.element);
    item.setOnRemoveLinstener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setDragStateListener((target: ItemContainer, state: DragState) => {
      switch (state) {
        case 'start':
          this.dragTarget = target;
          break;
        case 'end':
          this.dragTarget = undefined;
          this.dropTarget?.toggleClass();
          this.dropTarget = undefined;
          break;
        case 'enter':
          this.removeClass();
          this.dropTarget = target;
          this.dropTarget.toggleClass();
          break;
        default:
          throw new Error(`잘못된 state:${state}  입니다.`);
      }
    });
  }
}
