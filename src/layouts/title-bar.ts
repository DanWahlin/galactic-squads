import { accentFillRestBehavior } from "@fluentui/web-components";
import { css, customElement, DOM, FASTElement, html, observable, ref, when } from "@microsoft/fast-element";
import { Route } from "@microsoft/fast-router";
import { Session } from "../account/session";

const template = html<TitleBar>`
  <div class="container">
    <div class="toolbar">
      <fluent-text-field placeholder="Search"></fluent-text-field>
    </div>
    <fluent-button appearance="stealth" ${ref('avatar')} @click=${x => x.toggleMenu()}>
      <img src='static/image/avatar/${x => x.session.currentUser.id}.jpg'>
    </fluent-button>
    ${when(x => x.menuIsVisible, html<TitleBar>`
      <fluent-anchored-region
          :anchorElement="${x => x.avatar}"
          vertical-positioning-mode="dynamic"
          horizontal-positioning-mode="dynamic">
        <fluent-menu>
          <fluent-menu-item @click=${x => Route.name.push(x, 'settings')}>Settings</fluent-menu-item>
          <fluent-divider></fluent-divider>
          <fluent-menu-item @click=${x => x.logout()}>Sign out</fluent-menu-item>
        </fluent-menu>
      </fluent-anchored-region>
    `)}
  </div>
`;

const styles = css`
  :host {
    display: block;
    background: ${accentFillRestBehavior.var};
  }

  .container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .toolbar {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-left: 8px;
  }

  fluent-text-field {
    width: 50%;
  }

  img {
    width: 36px;
    height: 36px;
    display: block;
    border-radius: 50%;
    margin-right: 8px;
  }

  fluent-button {
    background: transparent;
    height: 100%;
    width: 54px;
  }

  fluent-anchored-region {
    z-index: 1000;
  }

  fluent-menu {
    margin-right: -54px;
  }
`.withBehaviors(
  accentFillRestBehavior
);

@customElement({
  name: 'title-bar',
  template,
  styles
})
export class TitleBar extends FASTElement {
  @Session session!: Session;
  @observable menuIsVisible = false;
  @observable avatar!: HTMLElement;

  async toggleMenu() {
    if (this.menuIsVisible) {
      document.removeEventListener('click', this.handleMenuDismiss);
    }

    this.menuIsVisible = !this.menuIsVisible;

    if (this.menuIsVisible) {
      await DOM.nextUpdate();
      document.addEventListener('click', this.handleMenuDismiss);
    }
  }

  handleMenuDismiss = () => {
    this.menuIsVisible = false;;
    document.removeEventListener('click', this.handleMenuDismiss);
  };

  logout() {
    this.session.logout();
    Route.name.push(this, 'login');
  }
}