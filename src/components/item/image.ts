import { BaseComponentImpl } from '../baseComponent.js';

export default class ImageItem extends BaseComponentImpl<HTMLImageElement> {
  constructor(src: string) {
    super(`<li>
      <div class="image">
        <img />
      </div>
    </li>`);

    const img = this.element.querySelector('.image img')! as HTMLImageElement;
    img.src = src;
    img.alt = src;
  }
}
