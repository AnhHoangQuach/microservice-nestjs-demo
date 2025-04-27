import { Document } from 'mongoose';

export interface IOrder extends Document {
  total_amount: string;
  status: string;
  shipping_address: string;
  billing_address: number;
  payment_status: number;
  user_id: string;
}
