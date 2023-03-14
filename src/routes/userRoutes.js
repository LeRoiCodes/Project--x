
const express = require("express");
const passport = require('passport');
const router = express.Router();
const { check } = require("express-validator");
const {loginUser, registerUser, verifyAccount, getUser, updateUser, forgotPassword, resetPassword, googleSignIn } = require('../controllers/userController');
const {authenticate} = require('../middleware/authMiddleware')

// Login User Route
router.post('/login', [
        check("email", "Please enter a valid email address").isEmail(),
        check("password", "valid password required").exists()
    ], loginUser);

router.post('/register', [
    check("firstName", "Your firstname must be 3+ characters long").exists().isLength({ min: 3}),
    check("lastName", "Your lastname must be 3+ characters long").exists().isLength({ min: 3}),
    check("email", "Please enter a valid email address").exists().isEmail(),
    check("password", "Password required and must be a minimum of 8 characters").exists().isLength({ min : 8 })
], registerUser);

router.get('/auth/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'https://project-xp.vercel.app/login', failureFlash: true}), googleSignIn)

router.get('/register/:code', verifyAccount);
router.get('/me', authenticate , getUser)
router.patch('/me', authenticate, updateUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword)


module.exports = router;