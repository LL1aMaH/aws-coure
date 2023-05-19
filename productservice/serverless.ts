import type { AWS } from '@serverless/typescript';

import getProductList from '@functions/getProductList';
import getProductsById from '@functions/getProductsById';
import createProduct from '@functions/createProduct';
import catalogBatchProcess from '@functions/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'aws-coure',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-auto-swagger', 'serverless-jest-plugin', 'serverless-dotenv-plugin'],
  useDotenv : true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      // PRODUCTS_TABLE_NAME: '${env:PRODUCTS_TABLE_NAME}',
      // STOCKS_TABLE_NAME: '${env:STOCKS_TABLE_NAME}',
      SNS_ARN: {
        Ref: 'SNSTopic',
      },
    },
    iam: {
      role: { 
        statements: [
          // {
          //   Effect: 'Allow',
          //   Action: 'dynamodb:*',
          //   Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/*',
          // },
          {
            Effect: 'Allow',
            Action: 'sqs:*',
            Resource: {
              'Fn::GetAtt': ['SQSQueue', 'Arn'],
            },
          },
          {
            Effect: 'Allow',
            Action: 'sns:*',
            Resource: {
              Ref: 'SNSTopic',
            },
          },
        ]
      },
    }
  },
  // import the function via paths
  functions: { getProductList, getProductsById, createProduct, catalogBatchProcess },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      title: 'string',
      apiType: 'http',
      generateSwaggerOnDeploy: false,
      typefiles: ['./src/types/index.ts'],
      basePath: '/dev',
      host: '',
      schemes: ['https'],
    },
  },
    resources: {
      Resources: {
        // products: {
        //   Type: "AWS::DynamoDB::Table",
        //   Properties: {
        //     TableName: '${env:DYNAMODB_PRODUCTS_TABLE}',
        //     KeySchema: [
        //       {
        //         KeyType: "HASH",
        //         AttributeName: "id"
        //       }
        //     ],
        //     AttributeDefinitions: [
        //       {
        //         AttributeName: "id",
        //         AttributeType: "S"
        //       }
        //     ],
        //     ProvisionedThroughput: {
        //       ReadCapacityUnits: 1,
        //       WriteCapacityUnits: 1
        //     }  
        //   }
        // },  
        // stocks: {
        //   Type: "AWS::DynamoDB::Table",
        //   Properties: {
        //     TableName:'${env:DYNAMODB_STOCKS_TABLE}',
        //     KeySchema: [
        //       {
        //         KeyType: "HASH",
        //         AttributeName: "product_id"
        //       }
        //     ],
        //     AttributeDefinitions: [
        //       {
        //         AttributeName: "product_id",
        //         AttributeType: "S"
        //       }
        //     ],
        //     ProvisionedThroughput: {
        //       ReadCapacityUnits: 1,
        //       WriteCapacityUnits: 1
        //     }    
        //   }
        // }  
        SQSQueue: {
          Type: 'AWS::SQS::Queue',
          Properties: {
            QueueName: '${env:SQS_NAME}',
          },
        },
        SNSTopic: {
          Type: 'AWS::SNS::Topic',
          Properties: {
            TopicName: '${env:SNS_TOPIC_NAME}',
          },
        },
        SNSSubscription: {
          Type: 'AWS::SNS::Subscription',
          Properties: {
            Endpoint: '${env:EMAIL}',
            Protocol: 'email',
            TopicArn: {
              Ref: 'SNSTopic',
            },
          },
        },
        SNSFilteredSubscription: {
          Type: 'AWS::SNS::Subscription',
          Properties: {
            Endpoint: '${env:PRIVATE_EMAIL}',
            Protocol: 'email',
            TopicArn: {
              Ref: 'SNSTopic',
            },
            FilterPolicy: {
              count: [{ numeric: ['<', 5] }],
            },
          },
        },
      }
    }
};

module.exports = serverlessConfiguration;
