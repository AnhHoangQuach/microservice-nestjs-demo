import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  create_by_user: string;
}
