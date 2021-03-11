import { DI } from '@microsoft/fast-foundation';
import { Serializer } from './serializer';

export interface Http {
  post<T = any>(url: string, request: any): Promise<T>;
  get<T = any>(url: string): Promise<T>;
}

class HttpImpl implements Http {
  constructor(@Serializer private serializer: Serializer) {}

  async post<T>(url: string, request: any): Promise<T> {
    const response = await fetch(`static/response/${url}.json`, {
      method: 'GET'
    });

    return this.serializer.deserialize<T>(response);
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`static/response/${url}.json`, {
      method: 'GET'
    });
    
    return this.serializer.deserialize<T>(response);
  }
}

export const Http = DI.createInterface<Http>(
  x => x.singleton(HttpImpl)
);