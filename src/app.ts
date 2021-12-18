import ImageItem from './components/item/image.js';
import TextItem from './components/item/text.js';
import Items from './components/items.js';

class App {
  private page;
  constructor() {
    this.page = document.querySelector('.page')! as HTMLElement;
    const items = new Items();
    items.attachTo(this.page);
    const image = new ImageItem('https://picsum.photos/400/300');
    image.attachTo(this.page);
    const text = new TextItem();
    text.attachTo(this.page);
  }
}

new App();
