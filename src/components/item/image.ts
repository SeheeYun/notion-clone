export default class ImageItem {
  private element;
  constructor(src: string) {
    const template = document.createElement('template');
    template.innerHTML = `<li class="image"><div><img /></div></li>`;
    this.element = template.content.firstElementChild! as HTMLElement;
    const img = this.element.querySelector('.image img')! as HTMLImageElement;
    img.src = src;
    img.alt = src;
  }

  attachTo(parents: HTMLElement, position: InsertPosition = 'beforeend') {
    parents.insertAdjacentElement(position, this.element);
  }
}
