# Simple notion clone

<img src="https://user-images.githubusercontent.com/77285472/150172943-51fab0c9-ae65-4347-92de-92de4d78e856.gif" width="100%">

TypeScript, OOP 학습을 위한 프로젝트로 타입스크립트와 객체지향 프로그래밍의 개념들을 사용하여 [notion](https://www.notion.so/ko-kr/product)의 기본적인 기능들을 구현한 프로젝트입니다.

## Features

- 각 유형(text, todo, image, video)의 아이템 추가 및 삭제
- drag & drop을 사용하여 아이템의 위치 변경
- form을 사용한 input 유효성 확인
- background 클릭 시 토글되는 dorpdown

## What i learned

### 1. 재사용 가능한 컴포넌트 구현

컴포넌트는 template element와 innerHTML를 사용하여 요소를 생성하고, 생성한 요소를 부모 요소에 포함시킬 수 있는 기능을 가진다. 공통된 반복되는 부분은 변수, 함수로 만들어 캡슐화하고 별도의 부분은 인자로 받아와서 재사용가능한 클래스로 만들어준다.

```js
export class BaseComponent {
  protected readonly element;
  constructor(elementHtmlStirng: string) {
    const template = document.createElement('template');
    template.innerHTML = elementHtmlStirng;
    this.element = template.content.firstElementChild! as HTMLElement;
  }

  attachTo(parents: HTMLElement, position: InsertPosition = 'beforeend') {
    parents.insertAdjacentElement(position, this.element);
  }
}
```

상속을 사용하여 재사용하기

```js
export class ImageItem extends BaseComponent {
  constructor(src: string) {
    super(`<li><div class="image"><img /></div></li>`);

    const img = this.element.querySelector('.image img')! as HTMLImageElement;
    img.src = src;
    img.alt = src;
  }
}
```

- **template element**<br/>
  HTML에는 어떤 타입의 요소가 다른 타입의 요소 내부에 존재할 수 있는지에대한 제한이 있어서 div를 사용하게 될 경우 div안에 잘못된 태그를 넣게되면 원하는대로 구현되지 않을 수 있다. template element는 이러한 제한이 적용되지않기때문에 다양한 요소 유형을 감싸기위해 사용된다.

- **innerHTML**<br/>
  이미지의 주소와같이 사용자에게 값을 받아와야하는 경우, 보안을 위해 받아온 값을 템플릿 리터럴로 직접 넣어주지않고 속성을 사용해서 따로 적용해준다.

- **super**<br/>
  super 키워드를 사용하면 부모 클래스에 접근 할 수 있다.
  자식클래스에서 constructor를 사용하고싶다면 constructor 내부에서 super를 호출해야한다.
  그리고 부모클래스의 constructor에 필요한 인자가 있다면 자식 클래스에서도 인자를 받아서 super의 인자로 부모클래스에 전달해주어야한다.

### 2. 의존성 주입을 사용해 재사용성 높이기

함수를 호출할 때마다 컴포넌트를 생성하는데, 의존성 주입을 사용해서 생성자를 인자로 받아와 한 가지 유형의 컴포넌트가 아닌 다른 유형의 컴포넌트도 생성할 수 있도록 만든다.

```ts
export class Items extends BaseComponentImpl<HTMLUListElement> {
  constructor(private itemConstructor: ItemContainerConstructor) {
    super(`<ul class="items"></ul>`);
  }

  addChild(child: BaseComponent) {
    const item = new this.itemConstructor();
    item.addChild(child);
    item.attachTo(this.element);
    item.setOnRemoveLinstener(() => item.removeFrom(this.element));
  }
}
```

클래스(생성자)를 인자로 받아올 수 있도록 construct signature를 사용해서 생성자의 타입을 정의하고,
ItemContainer라는 인터페이스를 규격화함으로써 다른 유형의 ItemContainer를 생성하는 클래스 또한 생성자로 사용될 수 있도록 한다.

```ts
type ItemContainerConstructor = {
  new (): ItemContainer;
};
```

### 3. 외부에서 리스너 등록하기

drag and drop 구현 시, 부모 컴포넌트는 드래그 이벤트가 발생하는 자식 컴포넌트에대한 정보를 알고 있어야한다.
이처럼 부모 클래스에서 자식 아이템에대한 정보가 필요할 때, 부모 클래스에서 필요한 로직을 작성해야할 때, 자식 클래스에서 이벤트에대한 리스너를 받아올 수 있는 메서드를 만들고 이를 외부에 제공하여 부모에서 필요한 콜백을 등록하도록 만든다.

```ts
export class ItemContainerImpl
  extends BaseComponentImpl<HTMLLIElement>
  implements ItemContainer
{
  private removeListener?: OnRemoveLinstener;
  private dragStateListener?: OnDragStateListener;

  setOnRemoveLinstener(listener: OnRemoveLinstener) {
    this.removeListener = listener;
  }
  setOnDragStateListener(listener: OnDragStateListener) {
    this.dragStateListener = listener;
  }
}
```

### 4. input 유효성 검사

dialog 컴포넌트의 재사용을 위해 각 버튼에 리스너를 외부에서 등록하도록하는데, submit에대한 리스너는 submit button이 아닌, submit 이벤트가 발생하는 form에 걸어줘야한다.
button에 걸어주면 input 태그의 required 속성을 통한 유효성확인이 되지않고 등록된 리스너가 곧바로 실행되기때문이다.

```ts
const form = this.element.querySelector('.dialog')! as HTMLFormElement;
form.addEventListener('submit', e => {
  e.preventDefault();
  this.submitListener && this.submitListener();
});
```

## Acknowledgements

- [Dream Coding](https://academy.dream-coding.com/)
