const router=require('express').Router();
const Product=require('../models/Product')
const User=require('../models/User')


router.get('/', async(req, res)=> {
    try {
      const sort = {'_id': -1}
      const products = await Product.find().sort(sort);
      res.status(200).json(products);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })



  router.post('/', async(req, res)=> {
    try {
      const {name, opis, cijena, kategorija, slika} = req.body;
      const product = await Product.create({name, opis, cijena, kategorija, slika});
      const products = await Product.find();
      res.status(201).json(products);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })


  router.patch('/:id', async(req, res)=> {
    const {id} = req.params;
    try {
        const {name, opis, cijena, kategorija, images: slika} = req.body;
      const product = await Product.findByIdAndUpdate(id, {name, opis, cijena, kategorija,slika});
      const products = await Product.find();
      res.status(200).json(products);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })



  router.delete('/:id', async(req, res)=> {
    const {id} = req.params;
    const {user_id} = req.body;
    try {
      const user = await User.findById(user_id);
      if(!user.isAdmin) return res.status(401).json("Nemate dozvolu za ovu radnju!");
      await Product.findByIdAndDelete(id);
      const products = await Product.find();
      res.status(200).json(products);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })


  router.get('/:id',async(req,res)=>{
const {id}=req.params;
try {
    const product=await Product.findById(id);
    const similar=await Product.find({kategorija:product.kategorija}).limit(5);
    res.status(200).json({product,similar})
    
} catch (error) {
    res.status(400).send(e.message);
}
  })

  router.get('/category/:category', async(req,res)=> {
    const {category} = req.params;

    try {
      let products;
      const sort = {'_id': -1}
      if(category.toLowerCase()  == "all"){
        products = await Product.find().sort(sort);
      } else {
         products=await Product.find({kategorija:category});
   
      }
      
      res.status(200).json(products)
    } catch (e) {
      res.status(400).send(e.message);
    }
  })



  //cart routers

  router.post('/add-to-cart',async(req,res)=>{
    const {userId,productId,price}=req.body
try {
  const user = await User.findById(userId);
    const userCart = user.cart;
    if(user.cart[productId]){
      userCart[productId] += 1;
    } else {
      userCart[productId] = 1;
    }
    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(price);
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
} catch (error) {
  res.status(400).send(e.message);
}

  })




  

  router.post('/increase-cart', async(req, res)=> {
    const {userId, productId, price} = req.body;
    try {
      const user = await User.findById(userId);
      const userCart = user.cart;
      userCart.total += Number(price);
      userCart.count += 1;
      userCart[productId] += 1;
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });
  
  router.post('/decrease-cart', async(req, res)=> {
    const {userId, productId, price} = req.body;
    try {
      const user = await User.findById(userId);
      const userCart = user.cart;
      userCart.total -= Number(price);
      userCart.count -= 1;
      userCart[productId] -= 1;
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  
  router.post('/remove-from-cart', async(req, res)=> {
    const {userId, productId, price} = req.body;
    try {
      const user = await User.findById(userId);
      const userCart = user.cart;
      userCart.total -= Number(userCart[productId]) * Number(price);
      userCart.count -= userCart[productId];
      delete userCart[productId];
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  


module.exports=router;






  
