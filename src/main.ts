import { FASTElement, customElement, html, css, observable, ref } from '@microsoft/fast-element';
import { neutralLayerL1Behavior } from '@fluentui/web-components';
import { DefaultRouteRecognizer } from '@microsoft/fast-router';
import { Container, inject, Registration } from '@microsoft/fast-foundation';
import { MainRouterConfig } from './routes';
import { styles_fontFaces } from './typography';
import './components';

const template = html<GalacticSquads>`
  <fluent-design-system-provider use-defaults ${ref('provider')}>
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
  @observable provider!: any;

  connectedCallback() {
    this.container.register(
      Registration.transient(DefaultRouteRecognizer, DefaultRouteRecognizer)
    );

    super.connectedCallback();
  }

  providerChanged() {
    this.provider.registerCSSCustomProperty(neutralLayerL1Behavior);

    this.provider.style.setProperty(
        "background-color",
        `var(--${neutralLayerL1Behavior.name})`
    );

    this.provider.backgroundColor = (neutralLayerL1Behavior.value as any)(
        this.provider.designSystem
    );

    this.provider.baseLayerLuminance = 1;
  }
}