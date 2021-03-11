import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import { FluentAccordion, FluentAccordionItem, FluentAnchor, FluentButton, FluentCard, FluentCheckbox, FluentDesignSystemProvider, FluentDivider, FluentListbox, FluentMenu, FluentMenuItem, FluentOption, FluentSlider, FluentSliderLabel, FluentTextField } from '@fluentui/web-components';
import { DefaultRouteRecognizer, FASTRouter } from '@microsoft/fast-router';
import { Container, inject, Registration } from '@microsoft/fast-foundation';
import { MainRouterConfig } from './routes';
import { styles_fontFaces } from './typography';

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
FluentCheckbox;
FluentSlider;
FluentSliderLabel;
FluentAccordion;
FluentAccordionItem;

const template = html<GalacticSquads>`
  <fluent-design-system-provider use-defaults>
    <fast-router :config=${x=> x.config}></fast-router>
  </fluent-design-system-provider>
`;

const styles = css`
  ${styles_fontFaces}
  
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

  connectedCallback() {
    this.container.register(
      Registration.transient(DefaultRouteRecognizer, DefaultRouteRecognizer)
    );

    super.connectedCallback();
  }
}