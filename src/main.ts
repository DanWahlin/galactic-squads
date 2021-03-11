import { FASTElement, customElement, html, css, ref, observable } from '@microsoft/fast-element';
import { FluentAnchor, FluentButton, FluentCard, FluentDesignSystemProvider, FluentDivider, FluentListbox, FluentMenu, FluentMenuItem, FluentOption, FluentTextField, neutralLayerL1Behavior } from '@fluentui/web-components';
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
FluentDivider;
FluentListbox;
FluentOption;

const template = html<GalacticSquads>`
  <fluent-design-system-provider use-defaults ${ref("provider")}>
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
  name: 'galactic-squads',
  template,
  styles
})
export class GalacticSquads extends FASTElement {
  @inject(MainRouterConfig) config!: MainRouterConfig;
  @Container container!: Container;
  @observable provider!: FluentDesignSystemProvider;

  providerChanged() {

  }

  connectedCallback() {
    this.container.register(
      Registration.transient(DefaultRouteRecognizer, DefaultRouteRecognizer)
    );

    super.connectedCallback();
  }
}