import { Document } from 'mongoose';

export interface IUser extends Document {
  id?: string;
  name: string;
  email: string;
  password: string;
  is_confirmed: boolean;
  role: 'user' | 'admin';
  compareEncryptedPassword: (password: string) => boolean;
  getEncryptedPassword: (password: string) => string;
}
