const mongoose = require('mongoose')
const { Schema } = mongoose

const SellreportSchema = new Schema({
  party_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'party'
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
  price: {
    type: Number,
    require: true
  },
  qty: {
    type: Number,
    require: true
  },
  bill_id: {
    type: String,
  },
  date: {
    type: Date,
		default: Date.now
  }
})

const Sellreport = mongoose.model('sell', SellreportSchema)
module.exports = Sellreport