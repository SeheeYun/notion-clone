import { BaseComponentImpl } from './baseComponent.js';

export class TitleItem extends BaseComponentImpl<HTMLElement> {
  constructor() {
    super(`
    <div
      class="text title"
      contenteditable="true"
      spellcheck="true"
      placeholder="제목 없음"
    >TypeScript</div>
 `);

    const mainHeader = document.querySelector(
      '.main__header'
    )! as HTMLDivElement;
    this.element.addEventListener('blur', () => {
      mainHeader.textContent = this.element.textContent;
    });
    this.element.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        this.element.blur();
      }
    });
  }
}
