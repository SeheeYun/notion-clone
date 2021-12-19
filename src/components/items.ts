import { BaseComponentImpl } from './baseComponent.js';

export default class Items extends BaseComponentImpl<HTMLUListElement> {
  constructor() {
    super(`<ul class="items"></ul>`);
  }
}
