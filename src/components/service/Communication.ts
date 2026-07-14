import { IProductApi, IApi, IOrderResult, IOrder } from "../../types";

export class Communication {
  api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getItems(): Promise<IProductApi> {
    return this.api.get<IProductApi>("/product/");
  }

  postOrder(order: IOrder): Promise<IOrderResult> {
    return this.api.post<IOrderResult>("/order", order);
  }
}
