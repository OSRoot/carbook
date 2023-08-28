export interface loginObject {
  phone: string;
  password: string;
}
export interface userObject {
  fullname: string;
  phone: string;
  password: string;
}

export interface Ad {
  _id?: string;
  carType: string;
  tyraz: string;
  model: string;
  tarqeemType: string;
  color: string;
  importType: string;
  counter: number;
  price?: number;
  advertiserName?: string;
  advertiserId?: string;
  media?: File[];
}

export interface User {
  fullname?: string;
  phone?: string;
  password?: string;
  clientType?: string;
}

export interface Expo {
  id: number;
  name: string;
  carsCount: number;
  logo?: string;
}

export enum Direction {
  'back',
  'forward',
  'root',
}
