import * as Joi from 'joi';

import config from 'config/environment/variables';
import { serviceSchema } from 'config/environment/schemas';

const { error, value: envVars } = Joi.validate(config, serviceSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  projectName: envVars.PROJECT_NAME,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  baseApiUrl: envVars.BASE_API_URL,
  database: {
    host: envVars.MSSQL_HOST,
    port: envVars.MSSQL_PORT,
    database: envVars.MSSQL_DATABASE,
    user: envVars.MSSQL_USER,
    password: envVars.MSSQL_PASSWORD,
    charset: envVars.MSSQL_CHARSET,
    collate: envVars.MSSQL_COLLATE,
    logging: envVars.MSSQL_LOGGING ? console.log : false, // tslint:disable-line: no-console
  },
};
