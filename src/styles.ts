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

export const mixin_screen = (display: string = 'block') => `
  contain: content;
  display: ${display};
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

export const mixin_cardStyles = `
  padding: 4px 16px 16px 16px;
`;

export const mixin_boxShadow = `
  --elevation: 4;
  box-shadow: 0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(0.11 * (2 - var(--background-luminance, 1)))), 0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(0.13 * (2 - var(--background-luminance, 1))));
`;

export const styles_animation = `
    :host {
        --animation-ease-in-fast: all ease-in 0.15s;
    }

    @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

    .fade-in {
        animation: fadeIn ease-in 0.2s;
    }
`;

export const accordionIcons = `
  <svg style="stroke: var(--neutral-outline-rest)" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" slot="collapsed-icon">
      <path d="M15.2222 1H2.77778C1.79594 1 1 1.79594 1 2.77778V15.2222C1 16.2041 1.79594 17 2.77778 17H15.2222C16.2041 17 17 16.2041 17 15.2222V2.77778C17 1.79594 16.2041 1 15.2222 1Z" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M9 5.44446V12.5556" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M5.44446 9H12.5556" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg><svg style="stroke: var(--neutral-outline-rest)" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" slot="expanded-icon">
      <path d="M15.2222 1H2.77778C1.79594 1 1 1.79594 1 2.77778V15.2222C1 16.2041 1.79594 17 2.77778 17H15.2222C16.2041 17 17 16.2041 17 15.2222V2.77778C17 1.79594 16.2041 1 15.2222 1Z" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M5.44446 9H12.5556" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
`;