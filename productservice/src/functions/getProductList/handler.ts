import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { products } from 'src/mocks';


export const getProductList = async () => {
  const data  = await products;
  return formatJSONResponse([...data]);
};

export const main = middyfy(getProductList);
