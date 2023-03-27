const express = require('express')
const router = express.Router();
const PartySchema = require('../model/partySchema')
const { successmessage, errormessage ,successmessagewith} = require('../response/Response')

router.get('/list', async (req, res) => {
  // PartySchema.find({ user: req.user }, { "user": 0, "__v": 0 }).then((e) => {
  //     res.status(200).send(successmessage(e));
  // }).catch((error) => {
  //   console.log(error)
  //   return res.status(500).send(errormessage(error))
  // })

  PartySchema.find().populate('user').exec(function(err, posts) {
    let senddata = []
    posts.map((e) => {
      let single = {}
      if(e.user._id.equals(req.user)){
        single['id'] = e._id
        single['name'] = e.party_name;
        single['mobile'] = e.mobile;
        senddata.push({ ...single})
      }
      // else {
      //   return res.status(200).send(successmessage([],['data not available']))
      // }
    })
    return res.status(200).send(successmessage(senddata,['data fetch success']))
  })
})

router.post('/add', async (req, res) => {
  const { mobile, party_name } = req.body
  const error = []
  if (!mobile || !party_name) {
    if (!mobile) {
      error.push('Mobile Nu. Required')
    }
    if (!party_name) {
      error.push('name Required')
    }
    return res.status(402).send(errormessage(error))
  } else {
    await PartySchema.create({
      mobile,
      party_name,
      user: req.user
    }).then((result) => {
      return res.status(200).send(successmessage(['Name Add Successfully']))
    }).catch((error) => {
      return res.status(500).send(errormessage(error))
    })
  }
})

router.post('/editdata/:id' , async(req,res) => {
  let id = req.params.id
  let userExist = []
  let find_party = await PartySchema.find({ user: req.user }, { "user": 0, "__v": 0 })
  for (let i = 0; i < find_party.length; i++) {
    if (find_party[i]._id.equals(id)) {
      userExist.push(find_party[i])
    }
  }
  if(userExist.length > 0){
    return res.status(200).send(successmessagewith(userExist));
  } else {
    return res.status(402).send(errormessage(['user not found']));
  }
})

router.put('/edit/:id', async (req, res) => {
  const { mobile, party_name } = req.body
  let id = req.params.id
  let error = []
  let new_data = {}
  let userExist = false
  let find_party = await PartySchema.find({ user: req.user })
  for (let i = 0; i < find_party.length; i++) {
    if (find_party[i]._id.equals(id)) {
      userExist = true
    }
  }
  if (userExist === true) {
    if (!mobile || !party_name) {
      if (!mobile) {
        error.push("Mobile Number Required")
      }
      if (!party_name) {
        error.push("Name Required")
      }
      return res.status(402).send(errormessage(error))
    } else {
      if (mobile || party_name) {
        if (mobile) {
          new_data.mobile = mobile
        }
        if (party_name) {
          new_data.party_name = party_name
        }
      }
      product_update = await PartySchema.findByIdAndUpdate(
        req.params.id,
        { $set: new_data },
        { new: true }
      );
      return res.status(200).send(successmessage(['party name update successfully']))
    }
  } else {
    return res.status(402).send(errormessage(['id mismatch']))

  }
})

router.delete('/delete/:id', async (req, res) => {
  let id = req.params.id
  let userExist = false;
  let find_party = await PartySchema.find({ user: req.user })
  if (find_party.length > 0) {
    for (let i = 0; i < find_party.length; i++) {
      if (find_party[i]._id.equals(id)) {
        userExist = true
      }
    }

    if (userExist) {
      PartySchema.findByIdAndDelete(req.params.id).then((e) => {
        res.status(200).send(successmessage(['Name Remove Successfull']));
      }).catch((error) => {
        console.log(error)
        return res.status(500).send(errormessage(error))
      })
    } else {
      return res.status(402).send(errormessage(['Id mismatch']))
    }
  } else {
    return res.status(402).send(errormessage('data not available'))
  }
})


module.exports = router;