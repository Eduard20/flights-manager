import { methods } from 'constants/constants';
import { Request, Response, NextFunction } from 'express';

export function handleOptionsRequest(req: Request, res: Response, next: NextFunction) {
  if (methods.options === req.method) {
    res.header('Content-Length', '0');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, Origin, Content-Type, Version');
    res.header('Access-Control-Expose-Headers', 'X-Requested-With, Authorization, Origin, Content-Type, Version');
    res.header('Access-Control-Max-Age', '3600');

    return res.end();
  }
  next();
}
