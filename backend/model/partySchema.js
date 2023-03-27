const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const { Schema } = mongoose

const PartySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  party_name: {
    type: String,
    require: true
  },
  mobile: {
    type: String,
  },

})

const Party = mongoose.model('party', PartySchema)
module.exports = Party;