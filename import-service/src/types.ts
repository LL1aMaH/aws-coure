export interface SignedUrl {
  url: string;
}

export interface ErrorResponse {
  message: string;
}

export enum Commands {
  'get' = 'get',
  'copy' = 'copy',
  'delete' = 'delete',
}