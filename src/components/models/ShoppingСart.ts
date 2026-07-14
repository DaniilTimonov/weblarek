import { IProduct } from "../../types/index.ts";

export class ShoppingCart {
  private productsInCart: IProduct[]; // хранит массив товаров, выбранных покупателем для покупки.

  constructor() {
    this.productsInCart = [];
  }

  getProductsInCart(): IProduct[] {
    return this.productsInCart;
  } // получение массива товаров, которые находятся в корзине;

  addProductsInCart(product: IProduct): void {
    const itemInCart = this.hasProductsInCart(product.id);

    if (!itemInCart) {
      this.productsInCart.push(product);
    }
  } // добавление товара, который был получен в параметре, в массив корзины;

  removeProductsInCart(product: IProduct): void {
    this.productsInCart = this.productsInCart.filter(
      (item) => item.id !== product.id,
    );
  } // удаление товара, полученного в параметре из массива корзины;

  clearCart(): void {
    this.productsInCart = [];
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
