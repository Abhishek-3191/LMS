const express=require('express');
const {registeredUser}=require('../../controllers/auth-controller/index');
const router=express.Router();

router.post('/register',registeredUser);

module.exports=router;