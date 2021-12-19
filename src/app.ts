import ImageItem from './components/item/image.js';
import TextItem from './components/item/text.js';
import TodoItem from './components/item/todo.js';
import VideoItem from './components/item/video.js';
import Items from './components/items.js';

class App {
  private page;
  constructor() {
    this.page = document.querySelector('.page')! as HTMLElement;
    const items = new Items();
    items.attachTo(this.page);
    const image = new ImageItem('https://picsum.photos/400/250');
    image.attachTo(this.page);
    const text = new TextItem();
    text.attachTo(this.page);
    const video = new VideoItem('https://www.youtube.com/watch?v=FvJABIYCFQY');
    video.attachTo(this.page);
    const todo = new TodoItem('강의 완강하기');
    todo.attachTo(this.page);
  }
}

new App();
