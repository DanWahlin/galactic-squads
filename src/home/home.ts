import { customElement, html, css, FASTElement } from '@microsoft/fast-element';
import { Session } from '../account/session';
import { Navigation } from '../router';

const template = html<HomeScreen>`
  <fluent-menu>
    <fluent-menu-item @click=${x => Navigation.push('account/settings')}>Settings</fluent-menu-item>
  </fluent-menu>
`;

const styles = css`
  :host {
    contain: content;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    height: 100%;
    width: 100%;
  }

  fluent-menu {
    background-color: rgba(255,255,255,0.94);
    backdrop-filter: blur(8px);
    margin-bottom: 1%;
    margin-right: 1%;
  }

  fluent-menu-item {
    text-align: center;
    font-size: 32px;
    height: 42px;
  }

  fluent-menu-item::part(content) {
    overflow: unset;
  }
`;

@customElement({
  name: 'home-screen',
  template,
  styles
})
export class HomeScreen extends FASTElement {
  @Session session!: Session;
}