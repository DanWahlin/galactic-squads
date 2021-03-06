import { FASTElement, customElement, html, css, observable, when } from '@microsoft/fast-element';
import { Navigation } from '../router';
import { Session } from './session';
import { sync } from '../kernel/sync';
import { isSuccess } from '../kernel/http';

const template = html<AccountSignup>`
  <div class="container">
    <h2>Sign Up</h2>
    <fluent-card @submit=${x => x.signup()}>
      <form>
        <fluent-text-field type="text" :value=${sync(x => x.username)} autofocus>Username</fluent-text-field>
        <fluent-text-field type="text" :value=${sync(x => x.email)}>Email</fluent-text-field>
        <fluent-text-field type="password" :value=${sync(x => x.password)}>Password</fluent-text-field>
        <fluent-text-field type="password" :value=${sync(x => x.passwordConfirm)}>Confirm Password</fluent-text-field>
        <fluent-button appearance="accent" type="submit" ?disabled=${x => x.session.isWorking}>Sign Up</fluent-button>
        ${when(x => !!x.message, html`
          <div class="message">${x => x.message}</div>
        `)}
      </form>
    </fluent-card>
    <p>
      Already have an account? <fluent-anchor href="account/login" appearance="hypertext">Log In</fluent-anchor>
    </p>
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
  name: 'account-signup',
  template,
  styles
})
export class AccountSignup extends FASTElement {
  @Session session!: Session;
  @observable username!: string;
  @observable email!: string;
  @observable password!:string;
  @observable passwordConfirm!: string;
  @observable message = '';

  public async signup() {
    const response = await this.session.signup({
      username: this.username,
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    });

    if (isSuccess(response)) {
      Navigation.push(`account/confirm/${response.body.confirmationId}`);
    } else {
      this.message = response.head.message;
    }
  }
}