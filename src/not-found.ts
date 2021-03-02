import { css, customElement, FASTElement, html } from '@microsoft/fast-element';

const template = html`
  <h1>Not Found</h1>
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
`;

@customElement({
  name: 'not-found',
  template,
  styles
})
export class NotFound extends FASTElement {

}