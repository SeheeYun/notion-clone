import { BaseComponentImpl } from './baseComponent.js';

export class Dropdown extends BaseComponentImpl<HTMLElement> {
  constructor() {
    super(`
    <div class="add-item">
      <button class="add-item__btn">➕ 아이템 추가하기</button>
      <ul class="add-item__list">
        <li><button id="new-text">텍스트</button></li>
        <li><button id="new-todo">할 일 목록</button></li>
        <li><button id="new-image">이미지</button></li>
        <li><button id="new-video">동영상</button></li>
      </ul>
    </div>
 `);

    const addBtn = this.element.querySelector(
      '.add-item__btn'
    )! as HTMLButtonElement;
    const addBtnList = this.element.querySelector(
      '.add-item__list'
    )! as HTMLUListElement;
    addBtn.addEventListener(
      'click',
      () => (addBtnList.style.display = 'block')
    );
    addBtn.addEventListener('blur', () => (addBtnList.style.display = 'none'));
  }
}
