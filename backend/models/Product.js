const mongoose=require('mongoose')

const productShema=mongoose.Schema({
name:{
    type:String,
    required:[true,"ne moze biti prazno"]
},

opis:{
    type:String,
    required:[true,"ne moze biti prazno"]
},

cijena:{
    type:String,
    required:[true,"ne moze biti prazno"]
},
kategorija:{
    type:String,
    required:[true,"ne moze biti prazno"]
},
slika:{
    type:String,
    required:true
}

}, {minimize: false});
const Product=mongoose.model('Product',productShema)

module.exports=Product

