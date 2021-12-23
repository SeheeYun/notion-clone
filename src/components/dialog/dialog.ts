import { BaseComponent, BaseComponentImpl } from '../baseComponent.js';
import { Composable } from '../items.js';

type OnCanclelistener = {
  (): void;
};
type OnSubmitListener = {
  (): void;
};

export class Dialog
  extends BaseComponentImpl<HTMLElement>
  implements Composable
{
  private cancleListener?: OnCanclelistener;
  private submitListener?: OnSubmitListener;
  constructor() {
    super(`
    <div class="dialog__bg">
      <form class="dialog">
        <div class="dialog__btns">
          <button class="dialog__cancle" type="button">취소</button><button class="dialog__submit" type="submit">확인</button>
        </div>
      </form>
    </div>
 `);

    const cancleBtn = this.element.querySelector(
      '.dialog__cancle'
    )! as HTMLButtonElement;
    cancleBtn.addEventListener('click', () => {
      this.cancleListener && this.cancleListener();
    });

    const form = this.element.querySelector('.dialog')! as HTMLFormElement;
    form.addEventListener('submit', e => {
      e.preventDefault();
      this.submitListener && this.submitListener();
    });
  }

  setOnCancleListener(listener: OnCanclelistener) {
    this.cancleListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: BaseComponent): void {
    const content = this.element.querySelector('.dialog')! as HTMLDivElement;
    child.attachTo(content, 'afterbegin');
  }
}
