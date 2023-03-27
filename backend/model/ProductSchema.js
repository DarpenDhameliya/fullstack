const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
  party_name:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'party'
  },
  party_userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  name: {
    type: String,
    require: true
  },
  sku: {
    type: String,
    require: true
  },
  gstid: {
    type: String,
    require: true
  },
  price:{
    type: Number,
    require: true
  },
  qty:{
    type: Number,
    require: true,
    validate(value){
      if(value < 0){
        throw new Error('not be nagetive')
      }
    }
  }
})

const Product = mongoose.model('product', ProductSchema)
module.exports = Product