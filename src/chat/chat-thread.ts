import { css, customElement, FASTElement, html, observable } from "@microsoft/fast-element";

const template = html<ChatThread>`
  Thread (${x => x.id})
`;

const styles = css`

`;

@customElement({
  name: 'chat-thread',
  template,
  styles
})
export class ChatThread extends FASTElement {
  @observable id!: string;
  

}