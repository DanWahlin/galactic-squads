import { accentFillRestBehavior, neutralFillStealthRestBehavior, neutralOutlineRestBehavior } from "@fluentui/web-components";
import { css, customElement, FASTElement, html } from "@microsoft/fast-element";
import { Route } from "@microsoft/fast-router";

const template = html<ActivityBar>`
  <fluent-button appearance="stealth" @click=${x => Route.name.push(x, 'chat')}>
    <svg viewBox="-6 -6 32 32" class="app-svg icons-chat" focusable="false" role="presentation"><path class="icons-default-fill icons-filled" d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C8.72679 18 7.49591 17.7018 6.38669 17.1393L6.266 17.075L2.62109 17.9851C2.31127 18.0625 2.02622 17.8369 2.00131 17.5438L2.00114 17.4624L2.01493 17.3787L2.925 13.735L2.86169 13.6153C2.4066 12.7186 2.12433 11.7422 2.03275 10.7283L2.00738 10.3463L2 10C2 5.58172 5.58172 2 10 2ZM10.5 11H7.5L7.41012 11.0081C7.17688 11.0504 7 11.2545 7 11.5C7 11.7455 7.17688 11.9496 7.41012 11.9919L7.5 12H10.5L10.5899 11.9919C10.8231 11.9496 11 11.7455 11 11.5C11 11.2545 10.8231 11.0504 10.5899 11.0081L10.5 11ZM12.5 8H7.5L7.41012 8.00806C7.17688 8.05039 7 8.25454 7 8.5C7 8.74546 7.17688 8.94961 7.41012 8.99194L7.5 9H12.5L12.5899 8.99194C12.8231 8.94961 13 8.74546 13 8.5C13 8.25454 12.8231 8.05039 12.5899 8.00806L12.5 8Z"></path><path class="icons-default-fill icons-unfilled" d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C8.72679 18 7.49591 17.7018 6.38669 17.1393L6.266 17.075L2.62109 17.9851C2.31127 18.0625 2.02622 17.8369 2.00131 17.5438L2.00114 17.4624L2.01493 17.3787L2.925 13.735L2.86169 13.6153C2.4066 12.7186 2.12433 11.7422 2.03275 10.7283L2.00738 10.3463L2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 11.217 3.31054 12.3878 3.89352 13.4249C3.94046 13.5084 3.9621 13.603 3.95692 13.6973L3.94274 13.7912L3.187 16.812L6.21104 16.0583C6.27294 16.0429 6.33662 16.0396 6.39873 16.0479L6.4903 16.0691L6.57701 16.1075C7.61362 16.6898 8.7837 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM10.5 11C10.7761 11 11 11.2239 11 11.5C11 11.7455 10.8231 11.9496 10.5899 11.9919L10.5 12H7.5C7.22386 12 7 11.7761 7 11.5C7 11.2545 7.17688 11.0504 7.41012 11.0081L7.5 11H10.5ZM12.5 8C12.7761 8 13 8.22386 13 8.5C13 8.74546 12.8231 8.94961 12.5899 8.99194L12.5 9H7.5C7.22386 9 7 8.77614 7 8.5C7 8.25454 7.17688 8.05039 7.41012 8.00806L7.5 8H12.5Z"></path></svg>
  </fluent-button>
  <fluent-button appearance="stealth" @click=${x => Route.name.push(x, 'settings')}>
    <svg viewBox="-6 -6 32 32" class="app-svg icons-settings" focusable="false" role="presentation"><g class="icons-default-fill"><path class="icons-filled" d="M1.91099 7.38266C2.28028 6.24053 2.88863 5.19213 3.69133 4.30364C3.82707 4.15339 4.04002 4.09984 4.23069 4.16802L6.14897 4.85392C6.66905 5.03977 7.24131 4.76883 7.42716 4.24875C7.44544 4.19762 7.45952 4.14507 7.46925 4.09173L7.83471 2.08573C7.87104 1.88627 8.02422 1.7285 8.22251 1.6863C8.8027 1.5628 9.39758 1.5 10.0003 1.5C10.6026 1.5 11.1971 1.56273 11.7769 1.68607C11.9752 1.72824 12.1284 1.88591 12.1648 2.08529L12.5313 4.09165C12.6303 4.63497 13.1511 4.9951 13.6944 4.89601C13.7479 4.88627 13.8004 4.87219 13.8515 4.85395L15.7698 4.16802C15.9605 4.09984 16.1734 4.15339 16.3092 4.30364C17.1119 5.19213 17.7202 6.24053 18.0895 7.38266C18.1518 7.57534 18.0918 7.78658 17.9374 7.91764L16.3825 9.23773C15.9615 9.5952 15.9101 10.2263 16.2675 10.6473C16.3027 10.6887 16.3411 10.7271 16.3825 10.7623L17.9374 12.0824C18.0918 12.2134 18.1518 12.4247 18.0895 12.6173C17.7202 13.7595 17.1119 14.8079 16.3092 15.6964C16.1734 15.8466 15.9605 15.9002 15.7698 15.832L13.8515 15.1461C13.3315 14.9602 12.7592 15.2312 12.5733 15.7512C12.5551 15.8024 12.541 15.8549 12.5312 15.9085L12.1648 17.9147C12.1284 18.1141 11.9752 18.2718 11.7769 18.3139C11.1971 18.4373 10.6026 18.5 10.0003 18.5C9.39758 18.5 8.8027 18.4372 8.22251 18.3137C8.02422 18.2715 7.87104 18.1137 7.83471 17.9143L7.46926 15.9084C7.37018 15.365 6.8494 15.0049 6.30608 15.104C6.25265 15.1137 6.20011 15.1278 6.14906 15.1461L4.23069 15.832C4.04002 15.9002 3.82707 15.8466 3.69133 15.6964C2.88863 14.8079 2.28028 13.7595 1.91099 12.6173C1.84869 12.4247 1.90876 12.2134 2.06313 12.0824L3.61798 10.7623C4.03897 10.4048 4.09046 9.77373 3.73299 9.35274C3.69784 9.31135 3.65937 9.27288 3.618 9.23775L2.06313 7.91764C1.90876 7.78658 1.84869 7.57534 1.91099 7.38266ZM8.00026 10C8.00026 11.1046 8.89569 12 10.0003 12C11.1048 12 12.0003 11.1046 12.0003 10C12.0003 8.89543 11.1048 8 10.0003 8C8.89569 8 8.00026 8.89543 8.00026 10Z"></path><path class="icons-unfilled" d="M1.91099 7.38266C2.28028 6.24053 2.88863 5.19213 3.69133 4.30364C3.82707 4.15339 4.04002 4.09984 4.23069 4.16802L6.14897 4.85392C6.66905 5.03977 7.24131 4.76883 7.42716 4.24875C7.44544 4.19762 7.45952 4.14507 7.46925 4.09173L7.83471 2.08573C7.87104 1.88627 8.02422 1.7285 8.22251 1.6863C8.8027 1.5628 9.39758 1.5 10.0003 1.5C10.6026 1.5 11.1971 1.56273 11.7769 1.68607C11.9752 1.72824 12.1284 1.88591 12.1648 2.08529L12.5313 4.09165C12.6303 4.63497 13.1511 4.9951 13.6944 4.89601C13.7479 4.88627 13.8004 4.87219 13.8515 4.85395L15.7698 4.16802C15.9605 4.09984 16.1734 4.15339 16.3092 4.30364C17.1119 5.19213 17.7202 6.24053 18.0895 7.38266C18.1518 7.57534 18.0918 7.78658 17.9374 7.91764L16.3825 9.23773C15.9615 9.5952 15.9101 10.2263 16.2675 10.6473C16.3027 10.6887 16.3411 10.7271 16.3825 10.7623L17.9374 12.0824C18.0918 12.2134 18.1518 12.4247 18.0895 12.6173C17.7202 13.7595 17.1119 14.8079 16.3092 15.6964C16.1734 15.8466 15.9605 15.9002 15.7698 15.832L13.8515 15.1461C13.3315 14.9602 12.7592 15.2312 12.5733 15.7512C12.5551 15.8024 12.541 15.8549 12.5312 15.9085L12.1648 17.9147C12.1284 18.1141 11.9752 18.2718 11.7769 18.3139C11.1971 18.4373 10.6026 18.5 10.0003 18.5C9.39758 18.5 8.8027 18.4372 8.22251 18.3137C8.02422 18.2715 7.87104 18.1137 7.83471 17.9143L7.46926 15.9084C7.37018 15.365 6.8494 15.0049 6.30608 15.104C6.25265 15.1137 6.20011 15.1278 6.14906 15.1461L4.23069 15.832C4.04002 15.9002 3.82707 15.8466 3.69133 15.6964C2.88863 14.8079 2.28028 13.7595 1.91099 12.6173C1.84869 12.4247 1.90876 12.2134 2.06313 12.0824L3.61798 10.7623C4.03897 10.4048 4.09046 9.77373 3.73299 9.35274C3.69784 9.31135 3.65937 9.27288 3.618 9.23775L2.06313 7.91764C1.90876 7.78658 1.84869 7.57534 1.91099 7.38266ZM2.97154 7.37709L4.26523 8.47546C4.34803 8.54576 4.42496 8.62269 4.49526 8.70548C5.2102 9.54746 5.10721 10.8096 4.26521 11.5246L2.97154 12.6229C3.26359 13.4051 3.68504 14.1322 4.21648 14.7751L5.81246 14.2044C5.91473 14.1679 6.01982 14.1397 6.12667 14.1202C7.21332 13.922 8.25487 14.6423 8.45305 15.729L8.75702 17.3975C9.16489 17.4655 9.58024 17.5 10.0003 17.5C10.42 17.5 10.8351 17.4656 11.2427 17.3976L11.5475 15.7289C11.567 15.6221 11.5951 15.517 11.6317 15.4147C12.0034 14.3746 13.1479 13.8327 14.1881 14.2044L15.784 14.7751C16.3155 14.1322 16.7369 13.4051 17.029 12.6229L15.7353 11.5245C15.6525 11.4542 15.5756 11.3773 15.5053 11.2945C14.7903 10.4525 14.8933 9.1904 15.7353 8.47544L17.029 7.37709C16.7369 6.59486 16.3155 5.86783 15.784 5.22494L14.1881 5.79559C14.0858 5.83214 13.9807 5.8603 13.8738 5.87979C12.7872 6.07796 11.7456 5.3577 11.5475 4.27119L11.2427 2.60235C10.8351 2.53443 10.42 2.5 10.0003 2.5C9.58024 2.5 9.16489 2.53448 8.75702 2.60249L8.45304 4.27105C8.43355 4.37791 8.40539 4.48299 8.36884 4.58527C7.99714 5.62542 6.8526 6.1673 5.81237 5.79556L4.21648 5.22494C3.68504 5.86783 3.26359 6.59486 2.97154 7.37709ZM7.50026 10C7.50026 8.61929 8.61954 7.5 10.0003 7.5C11.381 7.5 12.5003 8.61929 12.5003 10C12.5003 11.3807 11.381 12.5 10.0003 12.5C8.61954 12.5 7.50026 11.3807 7.50026 10ZM8.50026 10C8.50026 10.8284 9.17183 11.5 10.0003 11.5C10.8287 11.5 11.5003 10.8284 11.5003 10C11.5003 9.17157 10.8287 8.5 10.0003 8.5C9.17183 8.5 8.50026 9.17157 8.50026 10Z"></path></g></svg>
  </fluent-button>
`;

const styles = css`
  :host {
    contain: content;
    display: block;
    border-right: 1px solid ${neutralOutlineRestBehavior.var};
    background: ${neutralFillStealthRestBehavior.var};
    display: flex;
    flex-direction: column;
  }

  fluent-button:last-child {
    margin-top: auto;
  }

  fluent-button, svg {
    width: 100%;
    height: 64px;
  }
`.withBehaviors(
  neutralOutlineRestBehavior, 
  neutralFillStealthRestBehavior, 
  accentFillRestBehavior
);

@customElement({
  name: 'activity-bar',
  template,
  styles
})
export class ActivityBar extends FASTElement {

}