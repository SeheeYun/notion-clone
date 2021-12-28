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
import { TitleItem } from './components/title.js';

type DioalogConstructor = {
  new (): DialogContent;
};

type Selector = '#new-image' | '#new-todo' | '#new-text' | '#new-video';

class App {
  private items;
  constructor(mainRoot: HTMLElement, private dialogRoot: HTMLElement) {
    const title = new TitleItem();
    title.attachTo(mainRoot);
    this.items = new Items(ItemContainerImpl);
    this.items.attachTo(mainRoot);
    const dropdown = new Dropdown();
    dropdown.attachTo(mainRoot);

    this.setAddItemListener('#new-text', null, () => new TextItem());
    this.setAddItemListener('#new-todo', null, () => new TodoItem());
    this.setAddItemListener(
      '#new-image',
      ImageDialog,
      ImageDialog => new ImageItem(ImageDialog!.url)
    );
    this.setAddItemListener(
      '#new-video',
      VideoDialog,
      VideoDialog => new VideoItem(VideoDialog!.url)
    );

    // dummy content
    this.items.addChild(new TextItem());
    this.items.addChild(new TextItem());
    this.items.addChild(new ImageItem('https://picsum.photos/400/250'));
    this.items.addChild(new ImageItem('https://picsum.photos/400/250'));
    this.items.addChild(new VideoItem('https://youtu.be/j0wR3L_fATs'));
  }

  private setAddItemListener(
    selector: Selector,
    dioalogConstructor: DioalogConstructor | null,
    makeItem: (dialogContent?: DialogContent) => BaseComponent
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('mousedown', () => {
      if (dioalogConstructor) {
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
      } else {
        const item = makeItem();
        this.items.addChild(item);
      }
    });
  }
}

new App(
  document.querySelector('.main__content')!,
  document.querySelector('#app')!
);
