import { BaseComponentImpl } from '../baseComponent.js';

export default class TextItem extends BaseComponentImpl<HTMLElement> {
  constructor() {
    super(`<li>
    <div
      class="text"
      contenteditable="true"
      spellcheck="true"
      placeholder="여기에 글자를 입력해주세요."
    ></div>
  </li>`);
  }
}
