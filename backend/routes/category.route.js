import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { cretaeCategory, getAllParentCategories, getSubCategories } from '../controllers/category.controller.js';
const router = express.Router();

router.route('/create').post(isAuthenticated, cretaeCategory);

router.route('/get').get(getAllParentCategories); // get parent categoies

router.route('/get/:parentCategory').get(getSubCategories); //get subcategories

export default router