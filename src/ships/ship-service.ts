import { Http } from "../kernel/http";

export interface Ship {
  name: string;
}

interface ShipResponse {
  results: Ship[];
}

export class ShipService {
  private cache: Ship[] | null = null;

  constructor(@Http private http: Http) {}

  async getShips() {
    if (this.cache !== null) {
      return this.cache;
    }

    const response = await this.http.get<ShipResponse>('ships');
    return this.cache = response.results;
  }
}