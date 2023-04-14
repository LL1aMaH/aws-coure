import { formatJSONResponse, formatErrorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { combinedDBClient } from 'src/helpers/dynamoDBClient';
import { validationSchema } from './schema';

export const createProduct = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log(event);

  try {
    const porductData = JSON.parse(event.body);
    const isValid = await validationSchema.isValid(porductData);

    if (!isValid) {
      return formatErrorResponse(400, 'Request isn\'t valid');
    }

    const { count, ...product } = porductData;
    await combinedDBClient.transactPut({ product, stock: { product_id: product.id, count } });

    return formatJSONResponse();
  } catch (e) {
    console.log(e);
    return formatErrorResponse(500);
  }
};
export const main = middyfy(createProduct);