import { neutralFillStealthRestBehavior, neutralFillRestBehavior, neutralOutlineRestBehavior } from "@fluentui/web-components";
import { css, customElement, FASTElement, html, observable, repeat } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { Session } from "../account/session";
import { sync } from "../kernel/sync";
import { mixin_screen } from "../styles";
import { ChatService, Message, Thread } from "./chat-service";

const template = html<ChatThread>`
  <div class="container">
    <header>
      <img class="avatar" src='static/image/avatar/${x => x.thread?.owner.id}.jpg'>
      <h2 class="heading">${x => x.thread?.owner.name}</h2>
      <fluent-tabs>
        <fluent-tab>Chat</fluent-tab>
      </fluent-tabs>
    </header>

    <div class="messages">
      ${repeat(x => x.thread?.messages, html<Message, ChatThread>`
        <div class="message-container ${(x, c) => c.parent.messageAuthoredByUser(x) ? 'is-author' : 'not-author'}">
          <img class="avatar" src='static/image/avatar/${x => x.author.id}.jpg'>
          <div class="content">
            <div class="author">${x => x.author.name}</div>
            <div class="message">${x => x.message}</div>
          </div>
        </div>
      `)}
    </div>

    <form class="post" @submit=${x => x.postMessage()}>
      <fluent-text-field placeholder="Type a new message" 
                         :value=${sync(x => x.messageText)}></fluent-text-field>
      <fluent-button appearance="stealth" type="submit">
        <svg viewBox="-6 -6 32 32" role="presentation" class="app-svg icons-send icons-rtl-flip"><g class="icons-default-fill"><path class="icons-filled" d="M2.72113 2.05149L18.0756 9.61746C18.3233 9.73952 18.4252 10.0393 18.3031 10.287C18.2544 10.3858 18.1744 10.4658 18.0756 10.5145L2.72144 18.0803C2.47374 18.2023 2.17399 18.1005 2.05193 17.8528C1.99856 17.7445 1.98619 17.6205 2.0171 17.5038L3.53835 11.7591C3.58866 11.5691 3.7456 11.4262 3.93946 11.3939L10.8204 10.2466C10.9047 10.2325 10.9744 10.1769 11.0079 10.1012L11.0259 10.0411C11.0454 9.92436 10.9805 9.81305 10.8759 9.76934L10.8204 9.7534L3.90061 8.6001C3.70668 8.56778 3.54969 8.4248 3.49942 8.23473L2.01676 2.62789C1.94612 2.36093 2.10528 2.08726 2.37224 2.01663C2.48893 1.98576 2.61285 1.99814 2.72113 2.05149Z"></path><path class="icons-unfilled" d="M2.72113 2.05149L18.0756 9.61746C18.3233 9.73952 18.4252 10.0393 18.3031 10.287C18.2544 10.3858 18.1744 10.4658 18.0756 10.5145L2.72144 18.0803C2.47374 18.2023 2.17399 18.1005 2.05193 17.8528C1.99856 17.7445 1.98619 17.6205 2.0171 17.5038L3.9858 10.0701L2.01676 2.62789C1.94612 2.36093 2.10528 2.08726 2.37224 2.01663C2.48893 1.98576 2.61285 1.99814 2.72113 2.05149ZM3.26445 3.43403L4.87357 9.51612L4.93555 9.50412L5 9.5H12C12.2761 9.5 12.5 9.72386 12.5 10C12.5 10.2455 12.3231 10.4496 12.0899 10.4919L12 10.5H5C4.9686 10.5 4.93787 10.4971 4.90807 10.4916L3.26508 16.6976L16.7234 10.066L3.26445 3.43403Z"></path></g></svg>
      </fluent-button>
    </form>
  </div>
`;

const styles = css`
  :host {
    ${mixin_screen()}
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  header {
    border-bottom: 1px solid ${neutralOutlineRestBehavior.var};
    background: ${neutralFillStealthRestBehavior.var};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
  }

  header h2 {
    margin: 0;
    padding: 0;
  }

  fluent-tabs {
    margin-left: 8px;
    position: relative;
    top: 4px;
  }

  fluent-tabs::part(activeIndicator) {
    position: relative;
    top: 4px;
  }

  fluent-tab {
    font-weight: bold;
  }

  .messages {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .messages, .post {
    width: 60%;
    align-self: center;
  }

  .message-container {
    margin: 12px 0;
    display: flex;
    flex-direction: row;
    max-width: 75%;
  }

  .message-container.is-author {
    align-self: flex-end;
  }

  .is-author .avatar {
    display: none;
  }

  .not-author .avatar {
    margin-top: 6px;
  }

  .is-author .author {
    display: none;
  }

  .content {
    flex: 1;
    padding: 8px;
    border-radius: calc(var(--corner-radius) * 1px);
    background: ${neutralFillRestBehavior.var};
  }

  .author {
    font-weight: bold;
    font-size: var(--type-ramp-minus-1-font-size);
  }

  .message {

  }

  .post {
    display: flex;
    flex-direction: column;
    padding: 8px;
    margin: 0 8px;
  }

  fluent-button {
    align-self: flex-end;
    padding: 0;
  }

  svg {
    width: 32px;
    height: 32px;
  }

  .avatar {
    width: 36px;
    height: 36px;
    display: block;
    border-radius: 50%;
    margin-right: 12px;
  }
`.withBehaviors(
  neutralOutlineRestBehavior,
  neutralFillStealthRestBehavior,
  neutralFillRestBehavior
);

@customElement({
  name: 'chat-thread',
  template,
  styles
})
export class ChatThread extends FASTElement {
  @inject(ChatService) chatService!: ChatService;
  @Session session!: Session;

  @observable id!: string;
  @observable thread!: Thread;
  @observable messageText: string = '';

  async enter() {
    this.thread = await this.chatService.getThread(this.id);
  }

  messageAuthoredByUser(message: Message) {
    return message.author.id === this.session.currentUser.id;
  }

  postMessage() {
    this.chatService.post(this.thread, this.messageText);
  }
}