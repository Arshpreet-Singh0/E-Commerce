import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import {isAdmin} from '../middlewares/isAdmin.js'
import { createOrder, getOrders, updateOrder } from '../controllers/Order.controller.js';
const router = express.Router();

router.route('/create').post(isAuthenticated, createOrder);

router.route('/get').get(isAuthenticated, getOrders);

router.route('/update/:id').post(isAuthenticated, isAdmin, updateOrder);

export default router