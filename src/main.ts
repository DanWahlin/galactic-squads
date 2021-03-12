import { FASTElement, customElement, html, css, observable, ref } from '@microsoft/fast-element';
import { DataGridCellStyles, DataGridRowStyles, FluentAccordion, FluentAccordionItem, FluentAnchor, FluentButton, FluentCard, FluentCheckbox, FluentDataGrid, FluentDataGridCell, FluentDataGridRow, FluentDesignSystemProvider, FluentDivider, FluentListbox, FluentMenu, FluentMenuItem, FluentOption, FluentSlider, FluentSliderLabel, FluentTextField, neutralLayerL1Behavior } from '@fluentui/web-components';
import { DefaultRouteRecognizer, FASTRouter } from '@microsoft/fast-router';
import { AnchoredRegion, AnchoredRegionTemplate, Container, createDataGridCellTemplate, createDataGridRowTemplate, DataGridCell, DataGridRow, inject, Registration } from '@microsoft/fast-foundation';
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
FluentAccordion;
FluentMenu;
FluentMenuItem;
FluentDataGrid;
FluentDataGridRow;
FluentDataGridCell;

@customElement({
  name: 'fast-data-grid-row',
  template: createDataGridRowTemplate('fast'),
  styles: DataGridRowStyles
})
export class FASTDataGridRow extends DataGridRow {}

@customElement({
  name: 'fast-data-grid-cell',
  template: createDataGridCellTemplate('fast'),
  styles: DataGridCellStyles
})
export class FASTDataGridCell extends DataGridCell {}

@customElement({
  name: "fluent-anchored-region",
  template: AnchoredRegionTemplate,
  styles: css`
    :host {
        contain: layout;
        display: block;
    }
  `
})
export class FluentAnchoredRegion extends AnchoredRegion {}

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