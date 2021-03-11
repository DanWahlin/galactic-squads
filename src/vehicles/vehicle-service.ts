import { Http } from "../kernel/http";

export interface Vehicle {
  name: string;
}

interface VehicleResponse {
  results: Vehicle[];
}

export class ShipService {
  private cache: Vehicle[] | null = null;

  constructor(@Http private http: Http) {}

  async getVehicles() {
    if (this.cache !== null) {
      return this.cache;
    }

    const response = await this.http.get<VehicleResponse>('vehicles');
    return this.cache = response.results;
  }
}