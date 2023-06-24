const express=require('express');
const cors=require('cors');
const app=express();
const http=require('http');
const server=http.createServer(app);
const{Server}=require('socket.io');
require('./connection');

const User=require('./models/User');
const  userRoutes=require("./routes/userRoutes");
const productRoutes=require('./routes/productRoutes');



app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/users',userRoutes);
app.use('/products', productRoutes);

const io=new Server(server,{
    methods: ['GET', 'POST', 'PATCH', "DELETE"]
})


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  

server.listen(8080,()=>{
    console.log("Server radi na portu",8080)
})


