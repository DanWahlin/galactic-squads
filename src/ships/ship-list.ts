import { css, customElement, FASTElement, html, observable, repeat } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-foundation";
import { mixin_screen } from "../styles";
import { styles_headers } from "../typography";
import { Ship, ShipService } from "./ship-service";

const template = html<ShipList>`
  <div class="container">
    <h1>Ships</h1>
    <fluent-data-grid :rowsData=${x=> x.ships} :columnDefinitions=${x => x.columns}></fluent-data-grid>
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
  @observable ships: Ship[] = [];
  columns = [
    { columnDataKey: 'name', title: 'Name' },
    { columnDataKey: 'model', title: 'Model' },
    { columnDataKey: 'manufacturer', title: 'Manufacturer' },
    { columnDataKey: 'starship_class', title: 'Class' },
    { columnDataKey: 'cost_in_credits', title: 'Cost' },
    { columnDataKey: 'crew', title: 'Required Crew' },
    { columnDataKey: 'passengers', title: 'Max Passengers' },
    { columnDataKey: 'cargo_capacity', title: 'Max Cargo' },
    { columnDataKey: 'hyperdrive_rating', title: 'Hyperdrive Rating' }
  ];

  async enter() {
    this.ships = await this.shipService.getShips();
  }
}