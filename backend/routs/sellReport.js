const express = require('express');
const Sell = require('../model/SellreportSchema')
const party = require('../model/partySchema')
const router = express.Router();
const { successmessage, errormessage } = require('../response/Response');

router.post('/billreport', async (req, res) => {
  await Sell.find({ party_name: { $in: req.body.name } }, { "__v": 0 }).sort({bill_id: -1 }).then(e => {
    return res.status(200).send(successmessage(e))
  }).catch(error => {
    console.log(error)
    return res.status(402).send(errormessage(error))
  })
})
module.exports = router;