var express = require('express');
var router = express.Router();
const User = require('../models').User;
var register = require('../controller/auth.js')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {register, login, my_profile, update_profile} = require('../controller/auth')

var {create_category} = require('../controller/category')
var {create_product, read_product, delete_product, update_product, find_one_product} = require('../controller/product')

var router = express.Router()



var token_verification = function (req, res, next1) {
  try{
    const decoded = jwt.verify(req.header('Authorization'), 'secret');
    req.user = decoded.data
  }
  catch(err){
   // res.status(400).json({message:"Token Expaire", err})
  } 
  next1()
}


/* Register Api working */
router.post('/reg',  register)

/* Login Api */ 
router.post('/login', login ) 

/* Retrive or my-profile api */ 
router.get('/my-profile',token_verification, my_profile)


/* Update profile APi */ 

router.put('/update-profile',token_verification, update_profile)


router.post('/category-api', create_category)

router.post('/product-api', create_product)

router.get('/product-read', read_product)

router.delete('/product-delete/:id', delete_product)

router.put('/product-update', update_product)

router.get('/product-one-read/:id', find_one_product)

router.post('/product-get', find_one_product )



module.exports = router;
