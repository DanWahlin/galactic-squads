import { customElement, css } from '@microsoft/fast-element';
import { DataGridCellStyles, DataGridRowStyles, FluentAccordion, FluentAccordionItem, FluentAnchor, FluentButton, FluentCard, FluentCheckbox, FluentDataGrid, FluentDataGridCell, FluentDataGridRow, FluentDesignSystemProvider, FluentDivider, FluentListbox, FluentMenu, FluentMenuItem, FluentOption, FluentSlider, FluentSliderLabel, FluentTab, FluentTabs, FluentTextField } from '@fluentui/web-components';
import { FASTRouter } from '@microsoft/fast-router';
import { AnchoredRegion, AnchoredRegionTemplate, createDataGridCellTemplate, createDataGridRowTemplate, DataGridCell, DataGridRow } from '@microsoft/fast-foundation';

export {
  FluentDesignSystemProvider,
  FASTRouter,
  FluentCard,
  FluentButton,
  FluentTextField,
  FluentAnchor,
  FluentMenu,
  FluentMenuItem,
  FluentDivider,
  FluentListbox,
  FluentOption,
  FluentCheckbox,
  FluentSlider,
  FluentSliderLabel,
  FluentAccordion,
  FluentAccordionItem,
  FluentDataGrid,
  FluentDataGridRow,
  FluentDataGridCell,
  FluentTabs,
  FluentTab,
};

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