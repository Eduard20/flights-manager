import express from 'express';
// import validate from 'express-validation';
//
// import * as schemas from 'config/validations';
import * as controllers from 'controllers/service';

const router = express.Router();

router.get('/flights', controllers.getFlights);
export default router;
