import { TPayment } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IOrderForm {
  payment: TPayment | "";
  address: string;
}

export class OrderForm extends Form<IOrderForm> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(
    container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container, events);

    this.cardButton = ensureElement<HTMLButtonElement>(
      "button[name=card]",
      this.container,
    );

    this.cashButton = ensureElement<HTMLButtonElement>(
      "button[name=cash]",
      this.container,
    );

    this.addressInput = ensureElement<HTMLInputElement>(
      ".form__input",
      this.container,
    );

    this.cardButton.addEventListener("click", () => {
      this.events.emit("payment:card");
    });

    this.cashButton.addEventListener("click", () => {
      this.events.emit("payment:cash");
    });

    this.addressInput.addEventListener("input", () => {
      this.events.emit("form:address", { value: this.addressInput.value });
    });
  }

  set payment(value: TPayment | "") {
    this.cardButton.classList.toggle("button_alt-active", value === "card");
    this.cashButton.classList.toggle("button_alt-active", value === "cash");
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}
