import ImageItem from './components/item/image.js';
import Items from './components/items.js';

class App {
  private page;
  constructor() {
    this.page = document.querySelector('.page')! as HTMLElement;
    const items = new Items();
    items.attachTo(this.page);
    const imageItem = new ImageItem('https://picsum.photos/400/300');
    imageItem.attachTo(this.page);
  }
}

new App();
