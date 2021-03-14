import { neutralOutlineRestBehavior } from "@fluentui/web-components";
import { css, customElement, FASTElement, html, observable, repeat } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { NavigationPhase, Route } from "@microsoft/fast-router";
import { ChatService, ThreadSummary } from "./chat-service";
import { ChatRoutes } from "./chat-routes";

const template = html<ChatList>`
  <div class="container">
    <div class="list">
      <h2 class="heading">Chat</h2>
      <fluent-listbox>
        ${repeat(x => x.threads, html<ThreadSummary, ChatList>`
          <fluent-option :value="${x => x.owner.id}" 
                         ?selected=${(x,c) => x === c.parent.selectedThread}
                         @click=${(x, c) => Route.path.push(`chat/thread/${x.owner.id}`)}>
            <img class="avatar" src='static/image/avatar/${x => x.owner.id}.jpg'>
            <span>${x => x.owner.name}</span>
          </fluent-option>
        `)}
      </fluent-listbox>
    </div>
    <div class="thread">
      <fast-router :config=${x => x.config}></fast-router>
    </div>
  </div>
`;

const styles = css`
  :host {
    contain: content;
  }

  :host, fast-router {  
    display: block;
    width: 100%;
    height: 100%;
  }

  .container {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .heading {
    margin: 0;
    padding: 12px 16px 11px 16px;
  }

  .list {
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${neutralOutlineRestBehavior.var};
    width: 300px;
  }

  fluent-listbox {
    flex: 1;
    border-width: 1px 0 0 0;
  }

  fluent-option {
    height: 48px;
  }

  fluent-option::part(content) {
    display: flex;
    align-items: center;
  }

  .thread {
    flex: 1;
  }

  .avatar {
    width: 36px;
    height: 36px;
    display: block;
    border-radius: 50%;
    margin-right: 12px;
  }
`.withBehaviors(
  neutralOutlineRestBehavior
);

@customElement({
  name: 'chat-list',
  template,
  styles
})
export class ChatList extends FASTElement {
  config = new ChatRoutes();
  @inject(ChatService) chatService!: ChatService;
  @observable threads!: ThreadSummary[];
  @observable selectedThread!: ThreadSummary;

  enter(phase: NavigationPhase) {
    this.chatService.getRecentThreadSummaries()
      .then(x => {
        this.threads = x;
        this.selectedThread = x.find(x => `thread/${x.owner.id}` === phase.route.allParams['fast-child-route'])!;
      });
  }
}