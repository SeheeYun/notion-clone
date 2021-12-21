import { ImageItem } from './components/item/image.js';
import { TextItem } from './components/item/text.js';
import { TodoItem } from './components/item/todo.js';
import { VideoItem } from './components/item/video.js';
import { ItemContainerImpl, Items } from './components/items.js';

class App {
  private items;
  constructor(mainRoot: HTMLElement) {
    this.items = new Items(ItemContainerImpl);

    const image = new ImageItem('https://picsum.photos/400/250');
    const text = new TextItem();
    const video = new VideoItem('https://www.youtube.com/watch?v=FvJABIYCFQY');
    const todo = new TodoItem();

    this.items.addChild(image);
    this.items.addChild(text);
    this.items.addChild(video);
    this.items.addChild(todo);

    this.items.attachTo(mainRoot);
  }
}

new App(document.querySelector('.main__content')!);
