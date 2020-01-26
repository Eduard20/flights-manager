import * as Joi from 'joi';

export const defaultSchema = Joi.object()
  .keys({
    PROJECT_NAME: Joi.string().required(),
    LOG_LEVEL: Joi.string()
      .allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
      .default('debug'),
    LOG_PATH: Joi.string().when('LOG_TYPES', {
      is: Joi.array().items(Joi.string().valid('file')),
      then: Joi.string().required(),
      otherwise: Joi.string()
        .allow('')
        .optional(),
    }),
    LOG_TYPES: Joi.array()
      .min(1)
      .required(),
  })
  .unknown()
  .required();
