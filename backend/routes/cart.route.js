import express from 'express'
const router = express.Router();
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { addProductToCart, getCart } from '../controllers/cart.controller.js';

router.route('/addproducts').put(isAuthenticated, addProductToCart);

router.route('/get').get(isAuthenticated, getCart);

export default router