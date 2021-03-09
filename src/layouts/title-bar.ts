import { accentFillRestBehavior, neutralFillStealthRestBehavior, neutralOutlineRestBehavior } from "@fluentui/web-components";
import { css, customElement, FASTElement, html, ref } from "@microsoft/fast-element";
import { Route } from "@microsoft/fast-router";
import { Disposable, EventAggregator } from "../kernel/ea";
import { TitleBarContentRequest } from "./title-bar-content-request";

const template = html<TitleBar>`
  <div class="container" ${ref('container')}>
    <fast-button appearance="stealth" @click=${x => Route.name.push(x, 'home')}>
      <svg version="1.1" 
         xmlns="http://www.w3.org/2000/svg" 
         xmlns:xlink="http://www.w3.org/1999/xlink" 
         viewBox="0 0 24 24" 
         style="fill: currentColor">
        <g>
          <title>house-chimney-1</title>
          <path d="M4.5,24.003c-0.827,0-1.5-0.673-1.5-1.5v-9H1c-0.281,0-0.548-0.118-0.737-0.323C0.082,12.983-0.012,12.728,0,12.461
            c0.011-0.267,0.126-0.514,0.322-0.694L11.318,1.449C11.505,1.277,11.746,1.183,12,1.183c0.253,0,0.493,0.093,0.677,0.263L16,4.503
            v-1c0-0.551,0.448-1,1-1h2c0.552,0,1,0.449,1,1v4.689l3.688,3.585c0.197,0.181,0.313,0.448,0.313,0.727c-0.001,0.551-0.449,1-1,1
            h-2v9c0,0.827-0.673,1.5-1.5,1.5H4.5z M19.5,23.003c0.276,0,0.5-0.224,0.5-0.5v-9.5c0-0.276,0.224-0.5,0.5-0.5H23l-3.849-3.742
            C19.055,8.667,19,8.537,19,8.403v-4.9h-2v2.14c0,0.199-0.118,0.378-0.3,0.458c-0.063,0.028-0.131,0.042-0.2,0.042
            c-0.126,0-0.246-0.047-0.338-0.132L12,2.182L1.002,12.499L3.5,12.503c0.276,0,0.5,0.224,0.5,0.5v9.5c0,0.276,0.224,0.5,0.5,0.5h4
            v-6.5c0-0.827,0.673-1.5,1.5-1.5h4c0.827,0,1.5,0.673,1.5,1.5v6.5H19.5z M14.5,23.003v-6.5c0-0.276-0.224-0.5-0.5-0.5h-4
            c-0.276,0-0.5,0.224-0.5,0.5v6.5H14.5z"/>
        </g>
      </svg>
    </fast-button>
  </div>
`;

const styles = css`
  :host {
    contain: content;
    display: block;
    border-bottom: 1px solid ${neutralOutlineRestBehavior.var};
    background: ${neutralFillStealthRestBehavior.var};
  }

  .container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  fast-button {
    color: ${accentFillRestBehavior.var}
  }
`.withBehaviors(
  neutralOutlineRestBehavior, 
  neutralFillStealthRestBehavior, 
  accentFillRestBehavior
);

@customElement({
  name: 'title-bar',
  template,
  styles
})
export class TitleBar extends FASTElement {
  @EventAggregator ea!: EventAggregator;
  container!: HTMLDivElement;
  sub: Disposable | null = null;

  connectedCallback() {
    super.connectedCallback();

    this.sub = this.ea.subscribe(TitleBarContentRequest, x => {
      x.getContent().appendTo(this.container);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.sub !== null) {
      this.sub.dispose();
    }
  }
}