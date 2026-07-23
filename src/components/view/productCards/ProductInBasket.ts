import { ICardActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { ProductCard } from "./ProductCard";

interface IProductInBasket {
  index: number;
}

export class ProductInBasket extends ProductCard<IProductInBasket> {
  protected indexElement: HTMLElement;
  protected removeButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );

    this.removeButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container,
    );

    if (actions?.onClick) {
      this.removeButton.addEventListener("click", actions.onClick);
    }
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
