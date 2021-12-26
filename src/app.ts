import { BaseComponent } from './components/baseComponent.js';
import {
  DialogContent,
  ImageDialog,
  VideoDialog,
} from './components/dialog/content.js';
import { Dialog } from './components/dialog/dialog.js';
import { Dropdown } from './components/dropdown.js';
import { ImageItem } from './components/item/image.js';
import { TextItem } from './components/item/text.js';
import { TodoItem } from './components/item/todo.js';
import { VideoItem } from './components/item/video.js';
import { ItemContainerImpl, Items } from './components/items.js';

type DioalogConstructor = {
  new (): DialogContent;
};

type Selector = '#new-image' | '#new-todo' | '#new-text' | '#new-video';

class App {
  private items;
  constructor(mainRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.items = new Items(ItemContainerImpl);
    this.items.attachTo(mainRoot);
    const dropdown = new Dropdown();
    dropdown.attachTo(mainRoot);

    this.setAddItemListener(
      '#new-image',
      ImageDialog,
      ImageDialog => new ImageItem(ImageDialog.url)
    );
  }

  private setAddItemListener(
    selector: Selector,
    dioalogConstructor: DioalogConstructor,
    makeItem: (dialogContent: DialogContent) => BaseComponent
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('mousedown', () => {
      const dialog = new Dialog();
      const dialogContent = new dioalogConstructor();
      dialog.addChild(dialogContent);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCancleListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const item = makeItem(dialogContent);
        this.items.addChild(item);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(
  document.querySelector('.main__content')!,
  document.querySelector('#app')!
);

// https://picsum.photos/400/250
