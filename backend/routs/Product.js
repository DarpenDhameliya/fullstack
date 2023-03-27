//  let id = ObjectId("507c7f79bcf86cd7994f6c0e").valueOf() ====================>  get id value

const express = require('express');
const router = express.Router();
const Product = require('../model/ProductSchema')
const Party = require('../model/partySchema')
const { successmessage, errormessage } = require('../response/Response');

router.get('/list', async (req, res) => {
  await Product.find({ party_userId: req.user }, { "__v": 0, "party_name": 0 ,"party_userId":0}).then((e) => {
    return res.status(200).send(successmessage(e));
  }).catch(err => {
    console.log(err)
    return res.status(500).send(errormessage(err))
  })
})

router.post('/add', async (req, res) => {
  const { name, sku, gstid, price, qty } = req.body
  let user_data = await Party.find({ party_name: req.user_name });
  let result = user_data.map(a => a._id);

  const check_sku = await user_data.find(element => {
    if (element.sku === sku) {
      return element
    }
  });

  let error = []
  if (!name || !sku || !gstid) {
    if (!name) {
      error.push('Name Require')
    }
    if (!sku) {
      error.push('sku Require')
    }
    if (!gstid) {
      error.push('gstid Require')
    }
    return res.status(400).send(errormessage(error))
  } else {
    if (check_sku === undefined) {
      try {
        const product = new Product({
          name,
          sku,
          gstid,
          price,
          qty,
          party_name: result[0],
          party_userId: req.user
        });
        await product.save().then(() => {
          res.status(200).send(successmessage(["product added successfully"]));
        })
      } catch (error) {
        res.status(500).send(errormessage(error));
      }
    } else {
      res.status(400).send(errormessage(["sku taken"]));
    }
  }
})

router.put("/update", async (req, res) => {
  try {
    const { name, gstid, skuid, qty, price } = req.body
    let new_data = {};
    let error = []
    let userExist = false
    await Product.find({ _id: skuid }).then((res) => {
      res.map((data) => {
        if (data.party_userId.equals(req.user)) {
          userExist = true
        } else {
          return res.status(402).send(errormessage('user not exist'))
        }
      })
    }).catch(err => {
      console.log(err)
      return res.status(402).send(errormessage(['sku mismatch']))
    })

    if (userExist === true) {
      if (!name || !gstid || !qty || !price) {
        if (!name) {
          error.push("Name Required")
        }
        if (!gstid) {
          error.push("Gstid Required")
        }
        if (!qty) {
          error.push("qty Required")
        }
        if (!price) {
          error.push("Price Required")
        }
        return res.status(402).send(errormessage(error))
      } else {
        if (name || gstid || qty || price) {
          if (name) {
            new_data.name = name
          }
          if (gstid) {
            new_data.gstid = gstid
          }
          if (qty) {
            new_data.qty = qty
          }
          if (price) {
            new_data.price = price
          }
        }
        product_update = await Product.findByIdAndUpdate(
          skuid,
          { $set: new_data },
          { new: true }
        ).then((resu) => {
          console.log('ress', resu);
          return res.status(200).send(successmessage(['product update successfully']))
        }).catch((err) => {
          console.log('====================>', err)
          return res.status(402).send(successmessage(err))
        })
      }
    } else {
      return res.status(402).send(errormessage(['Product Not Found']))
    }
  } catch (e) {
    console.log(e)
  }
})

// router.delete('/delete/:id', async (req, res) => {
//   let id = req.params.id
//   let userExist = false
//   await Product.find({ _id: id }).then((res) => {
//     res.map(async (data) => {
//       if (data.party_userId.equals(req.user)) {
//         userExist = true
//       } else {
//         return res.status(402).send(errormessage('user not exist'))
//       }
//     })
//   }).catch(err => {
//     console.log(err)
//     return res.status(402).send(errormessage(['sku mismatch']))
//   })

//   if (userExist === true) {
//     await Product.findByIdAndDelete(id).then((e) => {
//       res.status(200).send(successmessage(['product Remove Successfull']));
//     }).catch((error) => {
//       console.log(error)
//       return res.status(500).send(errormessage(error))
//     })
//   } else {
//     return res.status(402).send(errormessage(['product not exist']))
//   }
// })

module.exports = router