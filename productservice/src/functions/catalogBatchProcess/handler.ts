import { SQSEvent } from 'aws-lambda';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { combinedDBClient } from 'src/helpers/dynamoDBClient';
import { productPayloadMapper } from 'src/helpers/productMapper';

const snsClient = new SNSClient({ region: 'us-east-1' });

export const catalogBatchProcess = async (event: SQSEvent): Promise<void> => {
  try {
    const products = event.Records.map(({ body }) => JSON.parse(body));
    const putProductsPromise = products.map(async (product) => {
      const payload = productPayloadMapper(product);
      return combinedDBClient.transactPut(payload);
    });

    await Promise.all(putProductsPromise);

    const subscriptionPpromise = products.map(async (product) => {
      const command = new PublishCommand({
        Subject: 'The following product has been added to DB',
        TopicArn: process.env.SNS_ARN,
        Message: JSON.stringify(product),
        MessageAttributes: {
          count: {
            DataType: 'Number',
            StringValue: `${product.count}`,
          },
        },
      });
      return snsClient.send(command);
    });

    await Promise.all(subscriptionPpromise);
  } catch (e) {
    console.log(e);
  }
};

export const main = catalogBatchProcess;