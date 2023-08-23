export interface INewUser {
  id: string;
  displayName: string;
  contactNo: string;
  email: string;
  roles: ('customer' | 'admin' | 'seller' | 'super_admin')[];
}
