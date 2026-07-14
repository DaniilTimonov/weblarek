import { IBuyer } from "../../types/index.ts";
import { TPayment } from "../../types/index.ts";

type CheckErrorBuyer = Partial<Record<keyof IBuyer, string>>;

export class BuyerInfo {
  private payment: TPayment | null; //  способ оплаты(онлайн | оффлайн);
  private address: string; //  адреc покупателя;
  private email: string; //  почта покупателя;
  private phone: string; //  номер телефона покупателя;

  constructor() {
    this.payment = null;
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  getBuyerInfo(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  } // получение всех данных покупателя;

  clearBuyerInfo(): void {
    this.payment = null;
    this.email = "";
    this.phone = "";
    this.address = "";
  } // очистка данных покупателя;

  setPayment(payment: TPayment | null): void {
    this.payment = payment;
  } // сохранение способа оплаты;

  setAddress(address: string): void {
    this.address = address;
  } // сохранение адресса;

  setEmail(email: string): void {
    this.email = email;
  } // сохранение почты;

  setPhone(phone: string): void {
    this.phone = phone;
  } // сохранение номера телефона;

  validateBuyerInfo(): CheckErrorBuyer {
    const error: CheckErrorBuyer = {};

    if (!this.payment) {
      error.payment = "Выберите способ оплаты";
    }

    if (!this.address) {
      error.address = "Укажите адрес";
    }

    if (!this.email) {
      error.email = "Укажите email";
    }

    if (!this.phone) {
      error.phone = "Укажите телефон";
    }

    return error;
  } // валидация данных;
}
