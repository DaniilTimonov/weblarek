import { ICardActions } from "../../../types";
import { CDN_URL } from "../../../utils/constants";
import { ensureElement, setCategory } from "../../../utils/utils";
import { ProductCard } from "./ProductCard";

interface IProductPreview {
  category: string;
  description: string;
  image: string;
  buttonText: string;
  buttonDisabled: boolean;
}

export class ProductPreview extends ProductCard<IProductPreview> {
  protected categoryCard: HTMLElement;
  protected descriptionCard: HTMLElement;
  protected cardButton: HTMLButtonElement;
  protected cardImage: HTMLImageElement;

  constructor(container: HTMLElement, actions: ICardActions) {
    super(container);

    this.categoryCard = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );

    this.descriptionCard = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );

    this.cardButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );

    this.cardImage = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );

    this.cardButton.addEventListener("click", actions.onClick);
  }

  set description(value: string) {
    this.descriptionCard.textContent = value;
  }

  set category(value: string) {
    setCategory(this.categoryCard, value);
  }

  set image(value: string) {
    this.setImage(this.cardImage, CDN_URL + value);
  }

  set buttonText(value: string) {
    this.cardButton.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this.cardButton.disabled = value;
  }
}
