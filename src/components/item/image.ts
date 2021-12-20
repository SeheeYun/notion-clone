import { BaseComponentImpl } from '../baseComponent.js';

export class ImageItem extends BaseComponentImpl<HTMLElement> {
  constructor(src: string) {
    super(`
      <div class="image">
        <img />
      </div>
    `);

    const img = this.element.querySelector('.image>img')! as HTMLImageElement;
    img.src = src;
    img.alt = src;
  }
}
