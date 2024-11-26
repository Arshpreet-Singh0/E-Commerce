import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { deleteProduct, getAdminProducts, getAllProduct, getCategoryProducts, getProductByBrand, getProductById, getProductBySubCategory, listProduct, updateProductInfo } from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.js';
const router = express.Router();

router.route('/create').post(isAuthenticated, upload, listProduct);

router.route('/update/:id').post(isAuthenticated, updateProductInfo);

router.route('/get').get(getAllProduct);

router.route('/get/admin').get(isAuthenticated, getAdminProducts);

router.route('/get/:id').get(getProductById);

router.route('/get/category/:name').get(getCategoryProducts);

router.route('/get/brand/:brand').get(getProductByBrand);

router.route('/get/subcategory/:subcategory').get(getProductBySubCategory);

router.route('/delete/:id').post(isAuthenticated, deleteProduct);


export default router