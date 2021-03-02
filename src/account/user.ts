import { observable } from '@microsoft/fast-element';
import { serializeObservables } from '../kernel/serializer';

type UserOptions = {
  string: IDBArrayKey;
  id: string;
  name: string;
  email: string;
  joinedOn: Date; 
};

@serializeObservables('User')
export class User {
  @observable public id!: string;
  @observable public name!: string;
  @observable public email!: string;
  @observable public joinedOn!: Date; 

  public constructor(options: UserOptions) {
    Object.assign(this, options);
  }
}