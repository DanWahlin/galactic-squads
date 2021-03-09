import { mixin_cardTitle } from "./typography";

export const styles_cardHeading = (className: string = 'heading') => `
  .${className} {
    background-color: #FFF;
    border-bottom: 1px solid rgba(0,0,0,0.12);
    ${mixin_cardTitle}
    font-size: 20px;
    margin: -4px -16px 0 -16px;
    padding: 8px 16px;
  }
`;

export const mixin_cardStyles = `
  background-color: rgba(255,255,255,0.94);
  backdrop-filter: blur(8px);
  padding: 4px 16px 16px 16px;
`;

export const mixin_boxShadow = `
  --elevation: 4;
  box-shadow: 0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(0.11 * (2 - var(--background-luminance, 1)))), 0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(0.13 * (2 - var(--background-luminance, 1))));
`;