import {
  FASTElement,
  html,
  observable,
  customElement,
  css,
} from "@microsoft/fast-element";

import { FluentTextField } from "@fluentui/web-components";

const template = html<TodoForm>`
  <form @submit=${x => x.submitTodo()}>
      <fluent-text-field
          autofocus
          :value=${x => x.description}
          @input=${(x, c) => x.onDescriptionInput(c.event)}
      ></fluent-text-field>
      <fluent-button
          type="submit"
          appearance="accent"
          ?disabled=${x => !x.canSubmitTodo}
      >
          Add Task
      </fluent-button>
  </form>
`;

const styles = css`
  form {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0;
      align-items: center;
      border-radius: calc(var(--corner-radius) * 1px);
      min-width: 320px;
      transition: var(--animation-ease-in-fast);
  }

  fluent-text-field::part(root) {
      background-color: var(--neutral-fill-rest);
      border: calc(var(--outline-width) * 1px) solid transparent;
      border-radius: calc(var(--corner-radius) * 1px) 0 0 calc(var(--corner-radius) * 1px);
      box-shadow: inset 0 0.5px 0.5px 0 var(--neutral-outline-rest),
                  inset 0.5px 0 0.5px 0 var(--neutral-outline-rest),
                  inset 0 -0.5px 0.5px 0 var(--neutral-outline-rest),
                  inset -0.5px 0 0.5px 0 var(--neutral-outline-rest);
      height: 44px;
      transition: var(--animation-ease-in-fast);
  }

  fluent-text-field::part(root):focus-within {
      background-color: var(--neutral-fill-active);
  }

  fluent-text-field::part(control) {
      padding: 0 24px;
      font-size: var(--type-ramp-plus-2-font-size);
      font-weight: 400;
  }

  fluent-button {
      border-radius: 0 calc(var(--corner-radius) * 1px) calc(var(--corner-radius) * 1px) 0;
      font-size: var(--type-ramp-plus-2-font-size);
      height: 44px;
      transition: var(--animation-ease-in-fast);
  }

  fluent-button::part(control) {
      padding: 0 calc((16 + (var(--design-unit) * 2 * var(--density))) * 1px);
  }
`;

@customElement({
  name: "todo-form",
  template,
  styles,
})
export class TodoForm extends FASTElement {
  @observable public description: string = "";

  get canSubmitTodo() {
      return !!this.description;
  }

  public submitTodo() {
      if (this.canSubmitTodo) {
          this.$emit("todo-submit", this.description);
          this.description = "";
      }
  }

  public onDescriptionInput(event: Event) {
      this.description = (event.target! as FluentTextField).value;
  }
}
