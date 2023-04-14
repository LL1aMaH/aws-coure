import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'products',
        cors: true,
        responseData: {
          200: {
            description: 'Success'
          },
          400: {
            description: 'Beda'
          },
          500: {
            description: 'Server Beda'
          }
        }
      },
    },
  ],
};
