import { FASTElement, customElement, html, css, observable, when } from '@microsoft/fast-element';
import { Session } from './session';
import { sync } from '../kernel/sync';
import { mixin_cardStyles, styles_cardHeading } from '../styles';

const template = html<AccountLogin>`
  <div class="container">
    <fluent-card>
      <h2 class="heading">Login</h2>
      <form @submit=${x => x.login()}>
        <fluent-text-field type="text" :value=${sync(x => x.username)} autofocus>Username</fluent-text-field>
        <fluent-text-field type="password" :value=${sync(x => x.password)}>Password</fluent-text-field>
        <fluent-button appearance="accent" type="submit" ?disabled=${x => x.session.isWorking}>
          Login
        </fluent-button>
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
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    width: 100%;
    background-color: black;
    background-image: url(static/image/logo.png);
    background-repeat: no-repeat, repeat;
    background-position: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    margin-bottom: 5%;
  }

  fluent-card {
    ${mixin_cardStyles}
    max-width: 300px;
  }

  ${styles_cardHeading}

  form {
    display: flex;
    flex-direction: column;
  }

  fluent-text-field {
    margin: 8px 0 12px 0;
  }

  fluent-button[type=submit] {
    align-self: flex-end;
  }

  .message {
    text-align: center;
    margin-top: 12px;
  }
`;

@customElement({
  name: 'account-login',
  template,
  styles
})
export class AccountLogin extends FASTElement {
  @Session session!: Session;
  @observable username = '';
  @observable password = '';
  @observable message = '';

  public async login() {
    const user = await this.session.login({
      username: this.username,
      password: this.password
    });

    if (user === null) {
      this.message = "Invalid credentials provided.";
    } else {
      this.session.navigateToLoginDestination();
    }
  }
}