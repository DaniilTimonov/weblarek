export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export type TPayment = 'card' | 'cash';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(
        uri: string,
        data: object,
        method?: ApiPostMethods,
    ): Promise<T>;
}

export interface IProduct {
    id: string; // ID   товара
    title: string; // Наименование   продукта
    image: string; // Изображение продукта
    category: string; // Категория продукта(к какой   группе она относится)
    price: number | null; // Цена продукта(есть или  нету)
    description: string; // Описание продукта
}

export interface IBuyer {
    payment: TPayment | null; // Способы оплат (ОНЛАЙН или ОФФЛАЙН)
    address: string; // адрес
    email: string; // почта
    phone: string; //  номер мобильный   
}

export type IProductApi = {
    total: number;
    items: IProduct[];
}

export type IOrder = IBuyer & {
    items: string[];
    total: number;
}

export type IOrderResult = {
    id: string;
    total: number;
}