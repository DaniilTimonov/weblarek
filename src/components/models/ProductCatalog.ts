import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class ProductCatalog {
  private products: IProduct[]; // поле хранит массив товаров.
  private selectedProduct: IProduct | null; // поле хранит товар, выбранный для подробного отображения. Если товар не выбран то будет null.
  protected events: IEvents;

  constructor(events: IEvents) {
    this.products = [];
    this.selectedProduct = null;
    this.events = events;
  }

  setProducts(products: IProduct[]): void {
    this.products = products;

    this.events.emit("catalog:changed");
  } // сохранение массива товаров полученного в параметрах метода

  getProducts(): IProduct[] {
    return this.products;
  } // получение массива товаров из модели;

  getProductById(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === id);
  } // получение одного товара по его id;

  setSelectedProduct(selectedProduct: IProduct): void {
    this.selectedProduct = selectedProduct;

    this.events.emit("product:selected");
  } //  сохранение товара для подробного отображения;

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  } // получение товара для подробного отображения;
}
