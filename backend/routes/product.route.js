import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { deleteProduct, getAllProduct, getCategoryProducts, getProductByBrand, getProductById, getProductBySubCategory, listProduct, updateProductInfo } from '../controllers/product.controller.js';
const router = express.Router();

router.route('/create').post(isAuthenticated, listProduct);

router.route('/update/:id').post(isAuthenticated, updateProductInfo);

router.route('/get').get(getAllProduct);

router.route('/get/:id').get(getProductById);

router.route('/get/category/:category').get(getCategoryProducts);

router.route('/get/brand/:brand').get(getProductByBrand);

router.route('/get/subcategory/:subcategory').get(getProductBySubCategory);

router.route('/delete/:id').post(isAuthenticated, deleteProduct);

export default router