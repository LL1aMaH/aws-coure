import { object, string, number } from 'yup';

export const validationSchema = object({
  id: string().required(),
  title: string().required(),
  description: string().required(),
  price: number().required(),
  count: number().required(),
});
