import { IBuyer } from "../../types/index.ts";
import { TPayment } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

type CheckErrorBuyer = Partial<Record<keyof IBuyer, string>>;

export class BuyerInfo {
  private payment: TPayment | ""; //  способ оплаты(онлайн | оффлайн);
  private address: string; //  адреc покупателя;
  private email: string; //  почта покупателя;
  private phone: string; //  номер телефона покупателя;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
    this.events = events;
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
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";

    this.events.emit("buyer:changed");
  } // очистка данных покупателя;

  setPayment(payment: TPayment | ""): void {
    this.payment = payment;

    this.events.emit("buyer:changed");
  } // сохранение способа оплаты;

  setAddress(address: string): void {
    this.address = address;

    this.events.emit("buyer:changed");
  } // сохранение адресса;

  setEmail(email: string): void {
    this.email = email;

    this.events.emit("buyer:changed");
  } // сохранение почты;

  setPhone(phone: string): void {
    this.phone = phone;

    this.events.emit("buyer:changed");
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
