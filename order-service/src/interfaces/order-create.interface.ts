export interface IOrderProductCreate {
  id: string;
  quantity: number;
}

export interface IOrderCreate {
  total_amount: number;
  shipping_address: string;
  billing_address: string;
  products: IOrderProductCreate[];
}
