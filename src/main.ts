import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import { FluentAnchor, FluentButton, FluentCard, FluentDesignSystemProvider, FluentTextField } from '@fluentui/web-components';
import { FASTRouter } from '@microsoft/fast-router';
import { Container } from '@microsoft/fast-foundation';
import { MainRouterConfig } from './routes';
import { fontFaces } from './typography';

FluentDesignSystemProvider;
FASTRouter;
FluentCard;
FluentButton;
FluentTextField;
FluentAnchor;

const template = html<GalacticDB>`
  <fluent-design-system-provider use-defaults>
    <fast-router :config=${x=> x.config}></fast-router>
  </fluent-design-system-provider>
`;

const styles = css`
  ${fontFaces}
  
  :host {
    contain: content;
  }

  :host, fluent-design-system-provider, fast-router {  
    display: block;
    width: 100%;
    height: 100%;
  }
`;

@customElement({
  name: 'galactic-db',
  template,
  styles
})
export class GalacticDB extends FASTElement {
  @MainRouterConfig config!: MainRouterConfig;
  @Container container!: Container;

  connectedCallback() {
    this.container.register(
      // TODO: register global singletons
    );

    super.connectedCallback();
  }
}