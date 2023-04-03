import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { products as promise } from 'src/mocks';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const products = await promise;

  const message = products.find(product=>product.id===event.pathParameters.productId) || 'Not found';

  return formatJSONResponse({
    message: message,
  }, message === 'Not found' ? 404 : 200 );
};

export const main = middyfy(getProductsById);
