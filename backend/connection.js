require('dotenv').config();

const mongoose=require('mongoose');

const conectionString="mongodb+srv://ecomern:ZaIMUTg9FfN5hb39@cluster0.9sbqias.mongodb.net/";

mongoose.connect(conectionString,{useNewUrlparser:true})
.then(()=>console.log("Konektovan na MongoDB"))
.catch(err =>console.log(err))

mongoose.connection.on('error', err => {
    console.log(err)
  })