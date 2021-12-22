import { BaseComponentImpl } from '../baseComponent.js';

type OnCanclelistener = {
  (): void;
};

type OnSubmitListener = {
  (): void;
};

export class Dialog extends BaseComponentImpl<HTMLElement> {
  private cancleListener?: OnCanclelistener;
  private submitListener?: OnSubmitListener;
  constructor() {
    super(`
    <div class="dialog__bg">
      <div class="dialog">
        <p>링크</p>
        <input type="text" placeholder="링크를 입력해주세요."/>
        <div class="dialog__btns">
          <button class="dialog__cancle">취소</button><button class="dialog__submit">확인</button>
        </div>
      </div>
    </div>
 `);

    const cancleBtn = this.element.querySelector(
      '.dialog__cancle'
    )! as HTMLButtonElement;
    cancleBtn.onclick = () => {
      this.cancleListener && this.cancleListener();
    };
    const submitBtn = this.element.querySelector(
      '.dialog__submit'
    )! as HTMLButtonElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCancleListener(listener: OnCanclelistener) {
    this.cancleListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
}
