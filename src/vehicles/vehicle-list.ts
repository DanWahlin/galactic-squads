import { css, customElement, FASTElement, html, observable, repeat } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { mixin_screen } from "../styles";
import { styles_headers } from "../typography";
import { Vehicle, ShipService } from "./vehicle-service";

const template = html<VehicleList>`
  <div class="container">
    <h1>Vehicles</h1>
    <fluent-data-grid :rowsData=${x => x.vehicles}></fluent-data-grid>
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
  name: 'vehicle-list',
  template,
  styles
})
export class VehicleList extends FASTElement {
  @inject(ShipService) shipService!: ShipService;
  @observable vehicles: Vehicle[] = [];

  async enter() {
    this.vehicles = await this.shipService.getVehicles();
  }
}