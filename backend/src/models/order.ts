export interface orderItem {
  name: string;
  count: number;
  price: number;
}

export interface orderStructure {
  _id?: string;
  user: string;
  reference: string;
  items: orderItem[];
  total: number;
  createdAt?: string;
}
