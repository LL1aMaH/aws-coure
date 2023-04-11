export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};

export interface ErrorResponse {
  message: string;
}

export interface Stock {
  product_id: string;
  count: number;
}