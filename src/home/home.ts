import { accentFillHoverBehavior, accentForegroundActiveBehavior, accentForegroundCutRestBehavior, neutralFocusInnerAccentBehavior, neutralLayerCardBehavior, neutralLayerL1AltBehavior, neutralLayerL1Behavior, neutralLayerL2Behavior } from '@fluentui/web-components';
import { customElement, html, css, FASTElement, observable, ExecutionContext, repeat } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-foundation';
import { mixin_screen, styles_animation as styles_enterAnimation } from '../styles';
import { styles_headers } from '../typography';
import { TodoForm } from './todo-form';
import { TodoItem, TodoService } from './todo-service';

function eventDetail<T = any>(ctx: ExecutionContext) {
  return (ctx.event as CustomEvent).detail as T;
}

TodoForm;

const template = html<HomeScreen>`
  <h1>Your Agenda for ${new Date().toLocaleDateString()}</h1>
  <header>
      <todo-form @todo-submit=${(x, c) => x.todoService.createTodo(eventDetail(c))}></todo-form>
  </header>
  <ul>
      ${repeat(
          x => x.todos,
          html<TodoItem, HomeScreen>`
              <li class="fade-in">
                  <fluent-checkbox
                      checked=${x => x.done}
                      @change=${x => x.toggleDone()}
                  ></fluent-checkbox>
                  <span class="list-text ${x => (x.done ? "done" : "")}">
                      ${x => x.description}
                  </span>
                  <fluent-button
                      @click=${(x, c) => c.parent.todoService.deleteTodo(x)}
                      aria-label="Remove item"
                  >
                      &times;
                  </fluent-button>
              </li>
          `
      )}
  </ul>
`;

const styles = css`
  :host {
    ${mixin_screen()}
  }

  ${styles_enterAnimation}
  ${styles_headers}

  h1 {
    padding: 16px 0 0 16px;
  }

  fluent-card {
      --card-width: 100%;
      --elevation: 4;
      display: grid;
      align-content: baseline;
      justify-items: center;
      background-color: ${neutralLayerCardBehavior.var};
      border-radius: 0;
      padding: 40px 80px;
  }

  header {
      display: grid;
      grid-template-columns: 1fr;
      gap: 4px 16px;
      align-items: center;
      background-color: ${neutralLayerL1Behavior.var};
      border-radius: calc(var(--corner-radius) * 1px) calc(var(--corner-radius) * 1px) 0px 0px;
      box-shadow: inset 0 calc(var(--outline-width) * -1px) 0px 0px var(--accent-fill-rest),
                  0 12px 32px -12px rgba(0,0,0,0.12),
                  0 24px 24px -20px rgba(0,0,0,0.12);
      box-sizing: border-box;
      padding: 12px 16px;
      width: 100%;
      transition: var(animation-ease-in-fast);
  }

  fluent-button {
      opacity: 0;
      user-select: none;
  }

  fluent-button:hover {
      background-color: #F00;
      color: #FFF;
      transition: var(--animation-ease-in-fast);
  }

  fluent-checkbox::part(control) {
      transition: var(--animation-ease-in-fast);
  }

  ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 100%;
  }

  li {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 0px 12px;
      background-color: ${neutralLayerL1Behavior.var};
      border-radius: 0;
      box-shadow: inset 0 calc(var(--outline-width) * -0.5px) 1px 0 var(--neutral-outline-rest),
                  0 12px 32px -12px rgba(0,0,0,0.12);
      box-sizing: border-box;
      align-items: center;
      width: calc(100%);
      margin: 0;
      padding: 8px 16px;
      transition: var(animation-ease-in-fast);
  }

  li:last-child {
      border-radius: 0px 0px calc(var(--corner-radius) * 1px) calc(var(--corner-radius) * 1px);
      box-shadow: inset 0 calc(var(--outline-width) * -0.5px) 1px 0 var(--neutral-outline-rest),
                  0 12px 32px -12px rgba(0,0,0,0.12),
                  0 24px 24px -20px rgba(0,0,0,0.12);
  }

  li:hover {
      background-color: ${neutralFocusInnerAccentBehavior.var};
      color: ${accentForegroundActiveBehavior.var};
  }

  li:hover fluent-button {
      opacity: 1;
  }

  .list-text {
      font-size: calc(var(--type-ramp-base-font-size) / 4 * var(--design-unit));
      line-height: var(--type-ramp-base-line-height);
  }

  .done {
      opacity: 40%;
      text-decoration: line-through;
      transition: var(animation-ease-in-fast);
  }
`.withBehaviors (
  neutralLayerL1AltBehavior,
  neutralLayerL1Behavior,
  neutralLayerL2Behavior,
  accentFillHoverBehavior,
  accentForegroundActiveBehavior,
  accentForegroundCutRestBehavior,
  neutralFocusInnerAccentBehavior,
  neutralLayerCardBehavior
);

@customElement({
  name: 'home-screen',
  template,
  styles
})
export class HomeScreen extends FASTElement {
  @inject(TodoService) todoService!: TodoService;
  @observable todos!: TodoItem[];

  async enter() {
    this.todos = await this.todoService.getTodos();
  }
}