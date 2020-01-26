import * as Joi from 'joi';

export const apiSchema = Joi.object()
  .keys({
    SERVICE_API_BASE_URL: Joi.string().required(),
    SERVICE_API_ENDPOINT: Joi.string().required(),
  })
  .unknown()
  .required();
