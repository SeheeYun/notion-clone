import { ImageItem } from './components/item/image.js';
import { TextItem } from './components/item/text.js';
import { TodoItem } from './components/item/todo.js';
import { VideoItem } from './components/item/video.js';
import { ItemContainer, Items } from './components/items.js';

class App {
  private page;
  constructor() {
    this.page = document.querySelector('.page')! as HTMLElement;
    const items = new Items();

    const image = new ImageItem('https://picsum.photos/400/250');
    const text = new TextItem();
    const video = new VideoItem('https://www.youtube.com/watch?v=FvJABIYCFQY');
    const todo = new TodoItem('강의 완강하기');

    items.addChild(image);
    items.addChild(text);
    items.addChild(video);
    items.addChild(todo);

    items.attachTo(this.page);
  }
}

new App();
