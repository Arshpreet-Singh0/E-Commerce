import express from 'express'
const router = express.Router();
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { addProductToCart, getCart, removeProductFromCart } from '../controllers/cart.controller.js';

router.route('/addproduct').post(isAuthenticated, addProductToCart);

router.route('/get').get(isAuthenticated, getCart);

router.route('/delete/:productid').post(isAuthenticated, removeProductFromCart);
export default router