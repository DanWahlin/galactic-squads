import { css, customElement, FASTElement, html, observable, repeat } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { mixin_screen } from "../styles";
import { styles_headers } from "../typography";
import { Ship, ShipService } from "./ship-service";

const template = html<ShipList>`
  <div class="container">
    <h1>Ships</h1>
    ${repeat(x => x.ships, html<Ship>`
      <div>${x => x.name}</div>
    `)}
  </div>
`;

const styles = css`
  :host {
    ${mixin_screen()}
  }
  
  ${styles_headers}

  .container {
    display: flex;
    flex-direction: column;
    padding: 16px 0 0 16px;
  }
`;

@customElement({
  name: 'ship-list',
  template,
  styles
})
export class ShipList extends FASTElement {
  @inject(ShipService) shipService!: ShipService;
  @observable ships!: Ship[];

  async enter() {
    this.ships = await this.shipService.getShips();
  }
}