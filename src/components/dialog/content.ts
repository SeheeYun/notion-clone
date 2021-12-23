import { BaseComponentImpl } from '../baseComponent.js';

interface Content {
  getUrl(): string;
}

export class ImageDialog
  extends BaseComponentImpl<HTMLElement>
  implements Content
{
  constructor() {
    super(`
   <div class="dialog__content">
      <p>이미지 링크</p>
      <input type="url" placeholder="이미지 링크를 입력해주세요." required />
  </div>
 `);
  }

  getUrl() {
    const url = this.element.querySelector('input')!.value;
    return url;
  }
}

export class VieoDialog
  extends BaseComponentImpl<HTMLElement>
  implements Content
{
  constructor() {
    super(`
    <div class="dialog__content">
        <p>동영상 링크</p>
        <input type="url" placeholder="동영상 링크를 입력해주세요." required />
    </div>
 `);
  }

  getUrl() {
    const url = this.element.querySelector('input')!.value;
    return url;
  }
}
