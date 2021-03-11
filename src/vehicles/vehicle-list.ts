import { css, customElement, FASTElement, html, observable, repeat } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { mixin_screen } from "../styles";
import { styles_headers } from "../typography";
import { Vehicle, ShipService } from "./vehicle-service";

const template = html<VehicleList>`
  <div class="container">
    <h1>Vehicles</h1>
    ${repeat(x => x.ships, html<Vehicle>`
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
    padding: 32px;
  }
`;

@customElement({
  name: 'vehicle-list',
  template,
  styles
})
export class VehicleList extends FASTElement {
  @inject(ShipService) shipService!: ShipService;
  @observable ships!: Vehicle[];

  async enter() {
    this.ships = await this.shipService.getVehicles();
  }
}