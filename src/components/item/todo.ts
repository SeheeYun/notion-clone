import { BaseComponentImpl } from '../baseComponent.js';

export default class TodoItem extends BaseComponentImpl<HTMLElement> {
  constructor(textContent: string) {
    super(`<li>
    <div class="todo">
      <input type="checkbox" />
      <label ></label>
    </div>
  </li>`);

    const label = this.element.querySelector(
      '.todo>label'
    )! as HTMLLabelElement;
    label.textContent = textContent;
  }
}
