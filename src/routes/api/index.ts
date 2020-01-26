import express from 'express';

import service from 'routes/api/service';

import { healthController } from 'controllers/health';

const router = express.Router();

// Service API
router.use(service);

// Server state check
router.get('/health', healthController);

export default router;
