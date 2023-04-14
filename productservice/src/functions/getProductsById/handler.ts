import { formatJSONResponse, formatErrorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { productsDBClient, stocksDBClient } from 'src/helpers/dynamoDBClient';
import { Product, Stock } from 'src/types';

export const getProductsById = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const { productId } = event.pathParameters;
  try {
    const productData = (await productsDBClient.getItem({ id: productId })) as Product;
    const stockData = (await stocksDBClient.getItem({ product_id: productId })) as Stock;

    if (!(productData && stockData)) {
      return formatErrorResponse(404, 'Product not found');
    }

    const product = { ...productData, count: stockData.count };

    return formatJSONResponse({ product });
  } catch (e) {
    console.log(e);
    return formatErrorResponse(500);
  }
};
export const main = middyfy(getProductsById);