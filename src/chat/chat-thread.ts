import { css, customElement, FASTElement, html, observable, repeat } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { ChatService, Message } from "./chat-service";

const template = html<ChatThread>`
  ${repeat(x => x.messages, html<Message>`
    <div>${x => x.author}</div>
    <div>${x => x.message}</div>
  `)}
`;

const styles = css`

`;

@customElement({
  name: 'chat-thread',
  template,
  styles
})
export class ChatThread extends FASTElement {
  @inject(ChatService) chatService!: ChatService;
  @observable id!: string;
  @observable messages!: Message[];

  async enter() {
    this.messages = await this.chatService.getThread(this.id);
  }
}