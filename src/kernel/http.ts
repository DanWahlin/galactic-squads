import { DI } from '@microsoft/fast-foundation';
import { Serializer } from './serializer';

export enum ResponseStatus {
  ok = 'ok',
  failure = 'failure'
};

export type SuccessResponse<T> = {
  head: {
    status: ResponseStatus.ok;
    message: string;
  };

  body: T;
}

export type FailureResponse = {
  head: {
    status: ResponseStatus.failure;
    message: string;
  }
};

export type Response<T = any> = FailureResponse | SuccessResponse<T>;

export function isSuccess<T>(response: Response<T>): response is SuccessResponse<T> {
  return response.head.status === ResponseStatus.ok;
}

export interface Http {
  postAnonymous<T>(url: string, request: any): Promise<Response<T>>;
  get<T = any>(url: string): Promise<Response<T>>;
}

class HttpImpl implements Http {
  constructor(@Serializer private serializer: Serializer) {}

  async postAnonymous(url: string, request: any): Promise<Response> {
    // const response = await fetch(`${this.baseURL}/${url}`, {
    //   method: 'POST',
    //   body: JSON.stringify(request)
    // });

    const response = await fetch(`static/response/${url}.json`, {
      method: 'GET'
    });

    return this.serializer.deserialize<Response>(response);
  }

  async get<T>(url: string) {
    const response = await fetch(`https://swapi.dev/api/${url}`, {
      method: 'GET'
    });
    
    const json = await response.json();

    return {
      head: {
        status: ResponseStatus.ok as any,
        message: 'Success',
      },
      body: json as T
    };
  }
}

export const Http = DI.createInterface<Http>(
  x => x.singleton(HttpImpl)
);