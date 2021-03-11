import { css, customElement, FASTElement, html, observable, repeat } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { styles_headers } from "../typography";
import { Ship, ShipService } from "./ship-service";

const template = html<ShipList>`
  <h1>Ships</h1>
  ${repeat(x => x.ships, html<Ship>`
    <div>${x => x.name}</div>
  `)}
`;

const styles = css`
  ${styles_headers}
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