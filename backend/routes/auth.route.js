import express from 'express'
import { login, signup, updatePassword, updateProfile } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
const router = express.Router();

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/update').post(isAuthenticated ,updateProfile);

router.route('/updatepassword').post(isAuthenticated ,updatePassword);

export default router