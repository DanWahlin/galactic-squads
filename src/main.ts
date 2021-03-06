import { FASTElement, customElement, html, css, ref, observable } from '@microsoft/fast-element';
import { createColorPalette, FluentAnchor, FluentButton, FluentCard, FluentDesignSystemProvider, FluentTextField } from '@fluentui/web-components';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import { FASTRouter } from './router';
import { MainRouterConfig } from './routes';
import { fontFaces } from './typography';
import { Container } from '@microsoft/fast-foundation';

FluentDesignSystemProvider;
FASTRouter;
FluentCard;
FluentButton;
FluentTextField;
FluentAnchor;

const template = html<MainApplication>`
  <fluent-design-system-provider use-defaults 
                               base-layer-luminance="1"
                               background-color="#F7F7F7"
                               ${ref('provider')}>
    <fast-router :config=${x => x.config}></fast-router>
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
  name: 'main-application',
  template,
  styles
})
export class MainApplication extends FASTElement {
  @MainRouterConfig config!: MainRouterConfig;
  @observable provider!: FluentDesignSystemProvider;
  @Container container!: Container;

  connectedCallback() {
    this.container.register(
      // TODO: register global singletons
    );
    
    super.connectedCallback();
  }

  providerChanged() {
    const accent = "#a03136";
    const palette = createColorPalette(parseColorHexRGB(accent));
    
    this.provider.accentBaseColor = accent;
    this.provider.accentPalette = palette;
  }
}