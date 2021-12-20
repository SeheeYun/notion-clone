import { BaseComponentImpl } from '../baseComponent.js';

export class TextItem extends BaseComponentImpl<HTMLElement> {
  constructor() {
    super(`
    <div
      class="text"
      contenteditable="true"
      spellcheck="true"
      placeholder="여기에 글자를 입력해주세요."
    ></div>
 `);
  }
}
