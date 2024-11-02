import express from 'express'
import { getUser, login, logout, signup, updatePassword, updateProfile } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
const router = express.Router();

router.route('/').post(isAuthenticated, getUser);

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/logout').post(logout);

router.route('/update').post(isAuthenticated ,updateProfile);

router.route('/updatepassword').post(isAuthenticated ,updatePassword);

export default router