import { IForm } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export abstract class Form<T> extends Component<IForm & T> {
  protected form: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected errorsForm: HTMLElement;

  constructor(
    container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container);

    this.form = container;

    this.submitButton = ensureElement<HTMLButtonElement>(
      "button[type='submit']",
      this.container,
    );

    this.errorsForm = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );

    this.container.addEventListener("submit", (event) => {
      event.preventDefault();
      this.events.emit(`${this.container.getAttribute("name")}:submit`);
    });
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: string) {
    this.errorsForm.textContent = value;
  }
}
