import { BaseComponentImpl } from '../baseComponent.js';

export default class VideoItem extends BaseComponentImpl<HTMLElement> {
  constructor(url: string) {
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
    iframe.src = this.youtubeParser(url);
  }

  private youtubeParser(url: string) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const id = match && match[7].length == 11 ? match[7] : undefined;
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
}
