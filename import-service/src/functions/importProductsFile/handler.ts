import { formatJSONResponse, formatErrorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'us-east-1' });

export const importProductsFile = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const { name } = event.queryStringParameters;

  if (!name) {
    return formatErrorResponse(400, 'File name was not provided');
  }

  const params: PutObjectCommandInput = {
    Bucket: 'aws-course-bucket-task5',
    Key: `uploaded/${name}`,
    ContentType: 'text/csv',
  };

  try {
    const command = new PutObjectCommand(params);
    const url: string = await getSignedUrl(client, command, { expiresIn: 3600 });
    return formatJSONResponse({ url });
  } catch (e) {
    console.log(e);
    return formatErrorResponse(500);
  }
};

export const main = middyfy(importProductsFile);