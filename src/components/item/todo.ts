import { BaseComponentImpl } from '../baseComponent.js';

export class TodoItem extends BaseComponentImpl<HTMLElement> {
  constructor(textContent: string) {
    super(`
    <div class="todo">
      <input type="checkbox" />
      <label ></label>
    </div>
  `);

    const label = this.element.querySelector(
      '.todo>label'
    )! as HTMLLabelElement;
    label.textContent = textContent;
  }
}
