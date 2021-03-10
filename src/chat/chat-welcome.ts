import { css, customElement, FASTElement, html } from "@microsoft/fast-element";

const template = html<ChatWelcome>`
  <h1>Welcome to Galactic Chat!</h1>
`;

const styles = css`

`;

@customElement({
  name: 'chat-welcome',
  template,
  styles
})
export class ChatWelcome extends FASTElement {

}