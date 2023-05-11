import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { S3EventRecord } from 'aws-lambda';
import { Commands } from 'src/types';

export const getCommand = (record: S3EventRecord) => (action: Commands) => {
  switch (action) {
    case Commands.get:
      return new GetObjectCommand({
        Bucket: record.s3.bucket.name,
        Key: record.s3.object.key,
      });
    case Commands.copy:
      return new CopyObjectCommand({
        CopySource: `${record.s3.bucket.name}/${record.s3.object.key}`,
        Bucket: record.s3.bucket.name,
        Key: record.s3.object.key.replace('uploaded', 'parsed'),
      });
    case Commands.delete:
      return new DeleteObjectCommand({
        Bucket: record.s3.bucket.name,
        Key: record.s3.object.key,
      });
  }
};