import { BaseComponent } from './../baseComponent';
import { BaseComponentImpl } from '../baseComponent.js';

export interface DialogContent extends BaseComponent {
  url: string;
}

export class ImageDialog
  extends BaseComponentImpl<HTMLElement>
  implements DialogContent
{
  constructor() {
    super(`
   <div class="dialog__content">
      <p>이미지 링크</p>
      <input type="url" placeholder="이미지 링크를 입력해주세요." required />
  </div>
 `);
  }

  get url(): string {
    const url = this.element.querySelector('input')!.value;
    return url;
  }
}

export class VideoDialog extends BaseComponentImpl<HTMLElement> {
  constructor() {
    super(`
    <div class="dialog__content">
        <p>동영상 링크</p>
        <input type="url" placeholder="동영상 링크를 입력해주세요." required />
    </div>
 `);
  }

  get url(): string {
    const url = this.element.querySelector('input')!.value;
    return url;
  }
}
