import { css, html } from '@microsoft/fast-element';

export const anonymousLayout = {
  template: html`
    <slot></slot>
    <fluent-card class="help">
      <fluent-anchor appearance="hypertext" href="help">Help</fluent-anchor>
    </fluent-card>
    <fluent-card class="footer">
      <fluent-anchor appearance="hypertext" href="terms">Terms</fluent-anchor>
      <fluent-anchor appearance="hypertext" href="privacy">Privacy</fluent-anchor>
    </fluent-card>
  `,
  styles: css`
    .help {
      position: fixed;
      top: 32px;
      right: -1px;
      width: 64px;
      height: 32px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .footer {
      position: fixed;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      height: 32px;
      width: 33%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .footer fluent-anchor:first-child {
      margin-right: 24px;
    }
  `
};