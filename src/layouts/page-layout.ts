import { css, html } from "@microsoft/fast-element";
import { TitleBar } from './title-bar';

TitleBar;

export const pageLayout = {
  template: html`
    <div class="container">
      <title-bar></title-bar>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  `,
  styles: css`
    .container {
      width: 100%;
      height: 100%;
      display: block;
      position: relative;
    }

    title-bar {
      width: 100%;
      height: 36px;
    }

    .content {
      position: absolute;
      top: 37px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `
};