import { Deserializable } from './deserializable.model';

export class User implements Deserializable {
  [x: string]: any;
  error: boolean;
  message: string;
  data: UserData;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}

export class UserData implements Deserializable {
  [x: string]: any;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
