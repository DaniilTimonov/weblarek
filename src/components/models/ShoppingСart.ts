import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class ShoppingCart {
  private productsInCart: IProduct[]; // хранит массив товаров, выбранных покупателем для покупки.
  protected events: IEvents;

  constructor(events: IEvents) {
    this.productsInCart = [];
    this.events = events;
  }

  getProductsInCart(): IProduct[] {
    return this.productsInCart;
  } // получение массива товаров, которые находятся в корзине;

  addProductsInCart(product: IProduct): void {
    const itemInCart = this.hasProductsInCart(product.id);

    if (!itemInCart) {
      this.productsInCart.push(product);
    }

    this.events.emit("basket:changed");
  } // добавление товара, который был получен в параметре, в массив корзины;

  removeProductsInCart(product: IProduct): void {
    this.productsInCart = this.productsInCart.filter(
      (item) => item.id !== product.id,
    );

    this.events.emit("basket:changed");
  } // удаление товара, полученного в параметре из массива корзины;

  clearCart(): void {
    this.productsInCart = [];

    this.events.emit("basket:changed");
  } // очистка корзины;

  getTotalPriceProductsInCart(): number {
    return this.productsInCart.reduce(
      (total, product) => total + (product.price ?? 0),
      0,
    );
  } // получение стоимости всех товаров в корзине;

  getProductsInCartCount(): number {
    return this.productsInCart.length;
  } // получение количества товаров в корзине;

  hasProductsInCart(id: string): boolean {
    return this.productsInCart.some((product) => product.id === id);
  } // проверка наличия товара в корзине по его id, полученного в параметре метода
}
