import { Constructable, Observable } from '@microsoft/fast-element';
import { DI } from '@microsoft/fast-foundation';

export type Deserializable = Constructable | { 
  prototype: any, 
  fromJSON(options: any): any; 
}

const keyToConstructor: Map<string, Deserializable> = new Map();

function getType(typeId: string) {
  return keyToConstructor.get(typeId);
}

export function getTypeId(object: any): string | undefined {
  if (object) {
    if (object.type) {
      return object.type;
    }

    const proto = Object.getPrototypeOf(object);
    if (!proto) {
      return void 0;
    }

    const ctor = proto.constructor;
    if (!ctor) {
      return void 0;
    }

    for (const [key, value] of keyToConstructor) {
      if (ctor === value) {
        return key;
      }
    }

    return void 0;
  }
}

const ISO8601 = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3])\:[0-5]\d|24\:00)(\:[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3])\:?([0-5]\d)?)?)?$/;
const NaNSymbol = '$NaN';

export class JSONSerializer implements Serializer {
  public serialize(object: any): string {
    return JSON.stringify(object, replacer);
  }

  public deserialize<T>(input: any) {
    if (input && input.ok) {
      return input.text().then((text: string) => JSON.parse(text, reviver));
    }

    return JSON.parse(input, reviver);
  }
}

function replacer(key: string, value: any): any {
  if (key) {
    const first = key[0];

    if (first === '_' || first === '$') {
      return void 0;
    }
  }

  if (value !== void 0 && value !== null) {
    const type = getTypeId(value);

    if (type) {
      value.type = type;
    } else if (Number.isNaN(value)) {
      return NaNSymbol;
    }
  }

  return value;
}

function reviver(key: string, value: any): any {
  if (typeof value === 'string') {
    const isDate = ISO8601.exec(value);
    if (isDate) {
      return new Date(value);
    } else if (value === NaNSymbol) {
      return Number.NaN;
    }
  } else {
    const typeId = value && value.type;

    if (typeId) {
      const ctor = getType(typeId);

      if (ctor) {
        if ('fromJSON' in ctor) {
          return (ctor as any).fromJSON(value);
        }

        return new ctor(value);
      }
    }
  }

  return value;
}

export function serializable(key: string): <T extends Deserializable>(type: T) => T {
  return function<T extends Deserializable>(type: T): T {
    keyToConstructor.set(key, type);
    type.prototype.type = key;
    (type as any).type = key;
    return type;
  };
}

export function serializeObservables(key: string): <T extends Constructable>(type: T) => T {
  return function<T extends Constructable>(type: T): T {
    const proto = type.prototype;
    keyToConstructor.set(key, type);
    proto.type = key;
    (type as any).type = key;

    if (!('toJSON' in proto)) {
      const accessors = Observable.getAccessors(type.prototype);

      proto.toJSON = function() {
        const json: any = { type: getTypeId(this) };
        
        for (let a of accessors) {
          json[a.name] = a.getValue(this);
        }

        return json;
      };
    }

    return type;
  };
}

export const Serializer = DI.createInterface(x => x.singleton(JSONSerializer));
export interface Serializer {
  serialize(object: any): string;
  deserialize<T = any>(response: Response): Promise<T>;
  deserialize<T = any>(text: string): T;
}