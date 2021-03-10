import { css, customElement, FASTElement, html } from "@microsoft/fast-element";

const template = html<ChatHome>`
  Home
`;

const styles = css`

`;

@customElement({
  name: 'chat-home',
  template,
  styles
})
export class ChatHome extends FASTElement {

}