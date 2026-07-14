import { IProduct } from "../../types/index.ts";

export class ProductCatalog {
  private products: IProduct[]; // поле хранит массив товаров.
  private selectedProduct: IProduct | null; // поле хранит товар, выбранный для подробного отображения. Если товар не выбран то будет null.

  constructor() {
    this.products = [];
    this.selectedProduct = null;
  }

  setProducts(products: IProduct[]): void {
    this.products = products;
  } // сохранение массива товаров полученного в параметрах метода

  getProducts(): IProduct[] {
    return this.products;
  } // получение массива товаров из модели;

  getProductById(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === id);
  } // получение одного товара по его id;

  setSelectedProduct(selectedProduct: IProduct): void {
    this.selectedProduct = selectedProduct;
  } //  сохранение товара для подробного отображения;

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  } // получение товара для подробного отображения;
}
