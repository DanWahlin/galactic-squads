import { customElement, html, css, FASTElement } from '@microsoft/fast-element';

const template = html<HomeScreen>`

`;

const styles = css`
  :host {
    contain: content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
`;

@customElement({
  name: 'home-screen',
  template,
  styles
})
export class HomeScreen extends FASTElement {
}