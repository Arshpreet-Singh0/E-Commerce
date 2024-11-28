import express from 'express';
import { checkOut, paymentVerification } from '../controllers/payment.controller.js';
const router = express.Router();

router.route('/checkout').post(checkOut);

router.route('/verify').post(paymentVerification);

export default router;