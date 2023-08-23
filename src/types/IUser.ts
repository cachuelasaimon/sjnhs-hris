export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  id: string;
  cartId: string;
  contactNumber: string;
  email: string;
  name: string;
  orders: string[];
  roles: ROLES[];
}
