import { neutralOutlineRestBehavior } from "@fluentui/web-components";
import { css, customElement, FASTElement, html, observable, repeat } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { NavigationPhase, Route } from "@microsoft/fast-router";
import { ChatService, ThreadSummary } from "../chat/chat-service";
import { SquadRoutes } from "./squad-routes";

const template = html<SquadList>`
  <div class="container">
    <div class="list">
      <h2 class="heading">Squads</h2>
      <fluent-listbox>
        ${repeat(x => x.threads, html<ThreadSummary, SquadList>`
          <fluent-option :value="${x => x.owner.id}" 
                         ?selected=${(x,c) => x === c.parent.selectedThread}
                         @click=${(x, c) => Route.path.push(`squads/thread/${x.owner.id}`)}>
            ${x => x.owner.name}
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

  .thread {
    flex: 1;
  }
`.withBehaviors(
  neutralOutlineRestBehavior
);

@customElement({
  name: 'squad-list',
  template,
  styles
})
export class SquadList extends FASTElement {
  config = new SquadRoutes();
  @inject(ChatService) chatService!: ChatService;
  @observable threads!: ThreadSummary[];
  @observable selectedThread!: ThreadSummary;

  async enter(phase: NavigationPhase) {
    const childRoute = phase.route.allParams['fast-child-route'];
    this.threads = await this.chatService.getSquads();

    if (childRoute) {
      this.selectedThread = this.threads.find(x => `thread/${x.owner.id}` === childRoute)!;
    } else if (this.threads.length > 0) {
      phase.cancel(() => Route.path.replace(`squads/thread/${this.threads[0].owner.id}`));
    }
  }
}