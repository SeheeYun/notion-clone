import { BaseComponentImpl } from '../baseComponent.js';

export class ImageItem extends BaseComponentImpl<HTMLElement> {
  constructor(url: string) {
    super(`
      <div class="image">
        <img />
      </div>
    `);

    const img = this.element.querySelector('.image>img')! as HTMLImageElement;
    img.src = url;
    img.alt = url;
  }
}
