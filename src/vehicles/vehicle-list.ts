import { css, customElement, FASTElement, html, observable, repeat } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { mixin_screen } from "../styles";
import { styles_headers } from "../typography";
import { Vehicle, ShipService } from "./vehicle-service";

const template = html<VehicleList>`
  <div class="container">
    <h1>Vehicles</h1>
    <fluent-data-grid :rowsData=${x => x.vehicles} :columnDefinitions=${x => x.columns}></fluent-data-grid>
  </div>
`;

const styles = css`
  :host {
    ${mixin_screen()}
  }
  
  ${styles_headers}

  h1 {
    padding: 16px 0 0 16px;
  }

  .container {
    display: flex;
    flex-direction: column;
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
  columns = [
    { columnDataKey: 'name', title: 'Name' },
    { columnDataKey: 'model', title: 'Model' },
    { columnDataKey: 'manufacturer', title: 'Manufacturer' },
    { columnDataKey: 'vehicle_class', title: 'Class' },
    { columnDataKey: 'cost_in_credits', title: 'Cost' },
    { columnDataKey: 'crew', title: 'Required Crew' },
    { columnDataKey: 'passengers', title: 'Max Passengers' },
    { columnDataKey: 'cargo_capacity', title: 'Max Cargo' },
  ];

  async enter() {
    this.vehicles = await this.shipService.getVehicles();
  }
}