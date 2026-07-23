import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IContactForm {
  email: string;
  phone: string;
}

export class ContactForm extends Form<IContactForm> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(
    container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>(
      ".form__input[name=email]",
      this.container,
    );

    this.phoneInput = ensureElement<HTMLInputElement>(
      ".form__input[name=phone]",
      this.container,
    );

    this.emailInput.addEventListener("input", () => {
      this.events.emit("form:email", { value: this.emailInput.value });
    });

    this.phoneInput.addEventListener("input", () => {
      this.events.emit("form:phone", { value: this.phoneInput.value });
    });
  }

  set email(value: string) {
    this.emailInput.value = value;
  }
  set phone(value: string) {
    this.phoneInput.value = value;
  }
}
