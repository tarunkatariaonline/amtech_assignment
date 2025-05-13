const express = require("express");
const router = express.Router();
const register = require('../Controllers/User/register.controller')
const login = require('../Controllers/User/login.controller')
const profile = require('../Controllers/User/profile.controller');
const logout = require("../Controllers/User/logout.controller");
const userAuth = require("../Middlewares/userAuth.middlware");


router.post("/register",register);
router.post('/login',login)
router.get('/',userAuth,profile)
router.get('/logout',userAuth,logout)
// ejs 
router.get('/register', (req, res) => {
  res.render('auth/register',{message:null});
});
router.get('/login', (req, res) => {
  res.render('auth/login',{message:null} );
});



module.exports = router;
