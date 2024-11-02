import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { deleteReview, postReview, updateReview } from '../controllers/review.controller.js';
const router = express.Router();


router.route('/create/:product').post(isAuthenticated, postReview);

router.route('/update/:id').post(isAuthenticated, updateReview);

router.route('/delete/:id').post(isAuthenticated, deleteReview);

export default router