import { accentFillRestBehavior } from "@fluentui/web-components";
import { css, customElement, FASTElement, html, observable, ref, when } from "@microsoft/fast-element";
import { Route } from "@microsoft/fast-router";
import { Session } from "../account/session";
import { getGravatarUrl } from "../kernel/gravatar";

const template = html<TitleBar>`
  <div class="container">
    <div class="toolbar">
      <fluent-text-field placeholder="Search"></fluent-text-field>
    </div>
    <img id="avatar" 
         ${ref('avatar')}
         src=${x => getGravatarUrl(x.session.currentUser.email)} 
         @click=${x => x.menuIsVisible = !x.menuIsVisible}>
    ${when(x => x.menuIsVisible, html<TitleBar>`
      <fluent-anchored-region
          :anchorElement="${x => x.avatar}"
          viewport="viewport-default"
          vertical-positioning-mode="dynamic"
          horizontal-positioning-mode="dynamic">
        <fluent-menu>
          <fluent-menu-item>Settings</fluent-menu-item>
          <fluent-divider></fluent-divider>
          <fluent-menu-item>Logout</fluent-menu-item>
        <fluent-menu>
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

  logout() {
    this.session.logout();
    Route.name.push(this, 'login');
  }
}