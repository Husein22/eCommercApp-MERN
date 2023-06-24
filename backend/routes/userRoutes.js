const router = require('express').Router();
const User = require('../models/User');


//post
router.post('/signup',async(req,res)=>{
const{name,email,password,lokacija,broj_telefona}=req.body;
try {
    const user = await User.create({name,email,password,lokacija,broj_telefona});
    res.json(user);
  } catch (e) {
    if(e.code === 11000) return res.status(400).send('Email vec postoji');
    res.status(400).send(e.message)
  }
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
      const user = await User.findByCredentials(email, password);
      res.json(user)
    } catch (e) {
      res.status(400).send(e.message)
    }
  })



  router.get("/",async(req,res)=>{
try {
    const user=await User.find({isAdmin:false}).populate("orders")
    res.json(user)
} catch (error) {
    res.status(400).send(e.message);
}

  })

  module.exports = router;