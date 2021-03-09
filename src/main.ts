import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import { FluentAnchor, FluentButton, FluentCard, FluentDesignSystemProvider, FluentMenu, FluentMenuItem, FluentTextField } from '@fluentui/web-components';
import { DefaultRouteRecognizer, FASTRouter } from '@microsoft/fast-router';
import { Container, inject, Registration } from '@microsoft/fast-foundation';
import { MainRouterConfig } from './routes';
import { mixin_fontFaces } from './typography';

FluentDesignSystemProvider;
FASTRouter;
FluentCard;
FluentButton;
FluentTextField;
FluentAnchor;
FluentMenu;
FluentMenuItem;

const template = html<GalacticDB>`
  <fluent-design-system-provider use-defaults>
    <fast-router :config=${x=> x.config}></fast-router>
  </fluent-design-system-provider>
`;

const styles = css`
  ${mixin_fontFaces}
  
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
  @inject(MainRouterConfig) config!: MainRouterConfig;
  @Container container!: Container;

  connectedCallback() {
    this.container.register(
      Registration.transient(DefaultRouteRecognizer, DefaultRouteRecognizer)
    );

    super.connectedCallback();
  }
}