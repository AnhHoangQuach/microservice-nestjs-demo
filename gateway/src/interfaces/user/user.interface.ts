export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  is_confirmed: boolean;
}
