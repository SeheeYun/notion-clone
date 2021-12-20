import { BaseComponentImpl } from '../baseComponent.js';

export class TodoItem extends BaseComponentImpl<HTMLElement> {
  constructor() {
    super(`
    <div class="todo">
      <input type="checkbox" />
      <label
      class="label"
      contenteditable="true"
      spellcheck="false"
      placeholder="할 일"
    ></label>
    </div>
  `);
  }
}
