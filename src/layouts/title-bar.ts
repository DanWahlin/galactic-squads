import { accentFillRestBehavior } from "@fluentui/web-components";
import { css, customElement, FASTElement, html } from "@microsoft/fast-element";
import { Route } from "@microsoft/fast-router";
import { Session } from "../account/session";
import { getGravatarUrl } from "../kernel/gravatar";

const template = html<TitleBar>`
  <div class="container">
    <div class="toolbar">
      <fluent-text-field placeholder="Search"></fluent-text-field>
    </div>
    <img  src=${x => getGravatarUrl(x.session.currentUser.email)}>
  </div>
`;

const styles = css`
  :host {
    contain: content;
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

  logout() {
    this.session.logout();
    Route.name.push(this, 'login');
  }
}