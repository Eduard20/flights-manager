import * as Joi from 'joi';

import { defaultSchema } from 'config/environment/schemas';

export const serviceSchema = defaultSchema.keys({
  PROJECT_NAME: Joi.string().required(),
  NODE_ENV: Joi.string()
    .allow(['development', 'production'])
    .default('development'),
  NODE_TLS_REJECT_UNAUTHORIZED: Joi.number()
    .allow([0, 1])
    .default(1),
  PORT: Joi.number().default(3000),
  SWAGGER_PORT: Joi.number().default(3001),
  BASE_API_URL: Joi.string().default('')
});
