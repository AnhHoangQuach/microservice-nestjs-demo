import { Document } from 'mongoose';

interface IOrderProduct extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  create_by_user: string;
}

export interface IOrder extends Document {
  total_amount: number;
  status: string;
  shipping_address: string;
  billing_address: number;
  payment_status: string;
  user_id: string;
  products: IOrderProduct[];
}
