import { ensureElement, setCategory } from "../../../utils/utils";
import { ICardActions, IProductCard } from "../../../types";
import { ProductCard } from "./ProductCard";
import { CDN_URL } from "../../../utils/constants";

interface IProductInGallery extends IProductCard {
  category: string;
  image: string;
}

export class ProductInGallery extends ProductCard<IProductInGallery> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );

    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }

  set category(value: string) {
    setCategory(this.categoryElement, value);
  }

  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value);
  }
}
