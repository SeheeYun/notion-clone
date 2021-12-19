import { BaseComponentImpl } from '../baseComponent.js';

export default class VideoItem extends BaseComponentImpl<HTMLElement> {
  constructor(src: string) {
    super(`<li>
    <div class="video">
      <iframe
        width="400"
        height="250"
        title="YouTube video player"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </li>`);

    const iframe = this.element.querySelector(
      '.video>iframe'
    )! as HTMLIFrameElement;
    iframe.src = src;
  }
}
