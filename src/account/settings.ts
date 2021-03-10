import { customElement, html, css, when, observable, FASTElement } from '@microsoft/fast-element';
import { Session } from './session';
import { sync } from '../kernel/sync';
import { getGravatarUrl } from '../kernel/gravatar';
import { mixin_cardTitle } from '../typography';
import { mixin_boxShadow, mixin_cardStyles, styles_cardHeading } from '../styles';

const template = html<AccountSettings>`
  <div class="container">
    <h1>Settings</h1>
    <aside class="profile-card">
      <header>
        <img src=${x => getGravatarUrl(x.session.currentUser.email)}>
        <h1>${x => x.session.currentUser.name}</h1>
        <h2>Member since ${x => x.session.currentUser.joinedOn}</h2>
      </header>
    </aside>

    <fluent-card @submit=${x => x.changePassword()}>
      <h2 class="heading">Change Password</h2>
      <form>
        <fluent-text-field type="password" :value=${sync(x => x.oldPassword)}>Old Password</fluent-text-field>
        <fluent-text-field type="password" :value=${sync(x => x.newPassword)}>New Password</fluent-text-field>
        <fluent-text-field type="password" :value=${sync(x => x.passwordConfirm)}>Confirm Password</fluent-text-field>
        <fluent-button appearance="accent" type="submit" ?disabled=${x => x.session.isWorking}>Update</fluent-button>
        ${when(x => !!x.changePasswordMessage, html<AccountSettings>`
          <div class="message">${x => x.changePasswordMessage}</div>
        `)}
      </form>
    </fluent-card>

    <fluent-card @submit=${x => x.changeEmail()}>
      <h2 class="heading">Change Email</h2>
      <form>
        <fluent-text-field type="password" :value=${sync(x => x.email)}>New Email</fluent-text-field>
        <fluent-button appearance="accent" type="submit" ?disabled=${x => x.session.isWorking}>Update</fluent-button>
        ${when(x => !!x.changeEmailMessage, html<AccountSettings>`
          <div class="message">${x => x.changeEmailMessage}</div>
        `)}
      </form>
    </fluent-card>
  </div>
`;

const styles = css`
  :host {
    contain: content;
    display: flex;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    overflow-y: auto;
  }

  .container {
    display: flex;
    flex-direction: column;
    padding: 32px;
  }

  ${styles_cardHeading()}

  fluent-card {
    width: 300px;
    margin-top: 8px;
    ${mixin_cardStyles}
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

  .profile-card header {
    position: relative;
    width: 100%;
    height: 260px;
    margin: 0;
    padding-top: 25px;
    background-color: var(--accent-fill-rest);
    border-radius: calc(var(--corner-radius) * 1px);
    ${mixin_boxShadow}
  }

  .profile-card header img {
    width: 100px;
    height: 100px;
    margin: 25px auto;
    display: block;
    border-radius: 50%;
    overflow: hidden;
    z-index: 5;
    border: 2px solid var(--accent-foreground-cut-rest);
  }

  .profile-card header h1 {
    position: relative;
    width: auto;
    padding: 5px;
    margin: 0;
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    color: var(--accent-foreground-cut-rest);
    vertical-align: top;
    z-index: 1;
    ${mixin_cardTitle}
  }

  .profile-card header h2 {
    position: relative;
    width: auto;
    padding: 0px;
    text-align: center;
    font-size: 16px;
    font-weight: 300;
    color: var(--accent-foreground-cut-rest);
    margin: 0;
    z-index: 1;
  }
`;

@customElement({
  name: 'account-settings',
  template,
  styles
})
export class AccountSettings extends FASTElement {
  @Session session!: Session;

  @observable oldPassword = '';
  @observable newPassword = '';
  @observable passwordConfirm = '';
  @observable changePasswordMessage = '';

  @observable email = '';
  @observable changeEmailMessage = '';

  changePassword() {

  }

  changeEmail() {
    
  }
}