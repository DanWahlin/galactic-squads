import { FASTElement, customElement, html, css, observable, when } from '@microsoft/fast-element';
import { Session } from './session';
import { sync } from '../kernel/sync';
import { isSuccess } from '../kernel/http';

const template = html<ConfirmAccount>`
  <div class="container">
    <h2>Confirm Account</h2>
    <fluent-card>
      <form @submit=${x => x.confirm()}>
        <fluent-text-field type="text" :value=${sync(x => x.confirmationCode)} autofocus>Code</fluent-text-field>
        <fluent-button appearance="accent" type="submit" ?disabled=${x => x.session.isWorking}>Confirm</fluent-button>
        ${when(x => !!x.message, html`
          <div class="message">${x => x.message}</div>
        `)}
      </form>
    </fluent-card>
  </div>
`;

const styles = css`
  :host {
    contain: content;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  fast-card {
    width: 300px;
    padding: 16px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  fluent-text-field {
    margin: 8px 0 12px 0;
  }

  fluent-button {
    align-self: flex-end;
  }

  .message {
    text-align: center;
    margin-top: 12px;
  }
`;

@customElement({
  name: 'confirm-email',
  template,
  styles
})
export class ConfirmAccount extends FASTElement {
  @Session session!: Session;
  public confirmationId!: string;
  @observable confirmationCode!: string;
  @observable message = '';

  public async confirm() {
    const response = await this.session.confirmAccount({
      confirmationId: this.confirmationId,
      confirmationCode: this.confirmationCode
    });

    if (isSuccess(response)) {
      this.session.navigateToLoginDestination();
    } else {
      this.message = response.head.message;
    }
  }
}