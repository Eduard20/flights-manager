import express, { Request, Response, NextFunction } from 'express';

import * as bodyParser from 'body-parser';

import { validationError, internalServerError, handleOptionsRequest } from 'middlewares';

import routes from 'routes';
import 'scripts/syncDatabase';

const app = express();

app.disable('x-powered-by');

// Applying options middleware
app.use(handleOptionsRequest);

// Applying CORS for the Swagger
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Parsing JSON request body
app.use(
  bodyParser.json({
    limit: 81920,
  }),
);

// Registering routes
app.use(routes);

// Handling express-validation errors
app.use(validationError);

// Handling express-validation errors
app.use(internalServerError);

export default app;
