import { css, html } from "@microsoft/fast-element";
import { FASTElementLayout } from "@microsoft/fast-router";
import { ActivityBar } from "./activity-bar";
import { TitleBar } from './title-bar';

TitleBar;
ActivityBar;

export const pageLayout = new FASTElementLayout(
  html`
    <div class="container">
      <title-bar></title-bar>
      <activity-bar></activity-bar>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  `,
  css`
    :host {
      --title-bar-height: 48px;
      --activity-bar-width: 68px;
    }

    .container {
      width: 100%;
      height: 100%;
      display: block;
      position: relative;
    }

    title-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--title-bar-height);
    }

    activity-bar {
      position: absolute;
      top: var(--title-bar-height);
      left: 0;
      width: var(--activity-bar-width);
      height: calc(100% - var(--title-bar-height));
    }

    .content {
      position: absolute;
      top: var(--title-bar-height);
      bottom: 0;
      left: calc(var(--activity-bar-width) + 1px);
      right: 0;
    }
  `
);