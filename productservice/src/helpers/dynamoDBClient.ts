import {
  DynamoDB,
  ScanCommandInput,
  TransactWriteItemsCommandInput,
  GetItemCommandInput
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

import { Product, Stock } from 'src/types';
import * as dotenv from 'dotenv';
dotenv.config();

const dynamodb = new DynamoDB({ region: 'us-east-1' });

class DynamoDBClient {
  productsTableName?: string;
  stocksTableName?: string;
  tableName: string;

  constructor({ productsTableName, stocksTableName }: { productsTableName?: string; stocksTableName?: string }) {
    this.productsTableName = productsTableName;
    this.stocksTableName = stocksTableName;
    this.tableName = productsTableName || stocksTableName;
  }

  async getItem(key: Record<string, unknown>): Promise<Product | Stock> {
    const params: GetItemCommandInput = {
      TableName: this.tableName,
      Key: marshall(key),
    };
    return unmarshall((await dynamodb.getItem(params)).Item) as Product | Stock;
  }

  async getItems(): Promise<Array<Product | Stock>> {
    const params: ScanCommandInput = {
      TableName: this.tableName,
    };
    return (await dynamodb.scan(params)).Items.map((item) => unmarshall(item)) as Array<Product | Stock>;
  }

  async transactPut({ product, stock }: { product: Product; stock: Stock }): Promise<void> {
    const params: TransactWriteItemsCommandInput = {
      TransactItems: [
        {
          Put: {
            TableName: this.productsTableName,
            Item: marshall(product),
          },
        },
        {
          Put: {
            TableName: this.stocksTableName,
            Item: marshall(stock),
          },
        },
      ],
    };
    await dynamodb.transactWriteItems(params);
  }
}

export const productsDBClient = new DynamoDBClient({ productsTableName: process.env.DYNAMODB_PRODUCTS_TABLE });
export const stocksDBClient = new DynamoDBClient({ stocksTableName: process.env.DYNAMODB_STOCKS_TABLE });
export const combinedDBClient = new DynamoDBClient({
  productsTableName: process.env.DYNAMODB_PRODUCTS_TABLE,
  stocksTableName: process.env.DYNAMODB_STOCKS_TABLE,
});