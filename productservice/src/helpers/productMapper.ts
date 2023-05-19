import { Product, Stock } from 'src/types';
import { v4 as uuid } from 'uuid';

export const productPayloadMapper = (productData): { product: Product; stock: Stock } => {
  const id = uuid();

  const { count, ...product } = productData;
  return {
    product: { ...product, id, price: parseFloat(product.price as string) },
    stock: { product_id: id, count: parseFloat(count as string) },
  };
};