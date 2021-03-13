import { css, customElement, FASTElement, html, observable, repeat } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { ChatService, Message, Thread } from "./chat-service";

const template = html<ChatThread>`
  <h2 class="heading">${x => x.thread?.owner.name}</h2>
  ${repeat(x => x.thread?.messages, html<Message>`
    <img src='static/image/avatar/${x => x.author.id}.jpg'>
    <div>${x => x.author.name}</div>
    <div>${x => x.message}</div>
  `)}
`;

const styles = css`
  .heading {
    margin: 0;
    padding: 8px 16px;
  }

  img {
    width: 36px;
    height: 36px;
    display: block;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

@customElement({
  name: 'chat-thread',
  template,
  styles
})
export class ChatThread extends FASTElement {
  @inject(ChatService) chatService!: ChatService;
  @observable id!: string;
  @observable thread!: Thread;

  async enter() {
    this.thread = await this.chatService.getThread(this.id);
  }
}