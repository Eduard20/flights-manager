import { Request, Response } from 'express';
import { messages } from 'constants/messages';

const now = new Date();

const tags = process.env.HEALTH_TAGS;
const date = `${now.toLocaleTimeString()} ${now.toLocaleDateString()}`;

export function healthController(req: Request, res: Response) {
  res.json({
    status: messages.success.ok,
    tags,
    date,
  });
}
