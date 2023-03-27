const express = require('express')
const router = express.Router();
const party = require('../model/partySchema')
const Product = require('../model/ProductSchema');
const Sellreport = require('../model/SellreportSchema');
const { successmessage, errormessage, successmessagewith, errormessagewith } = require('../response/Response')

// router.post('/bill', async (req, res) => {
//   // let id = req.params.id
//   const { name, qty } = req.body

//   // let data2 = []
//   // await Product.find({name:name}).then(e => {
//   //   return e.map(data => {
//   //     data2['id']=data._id
//   //     data2['party_name']=data.party_name
//   //     data2['name']=data.name
//   //     data2['sku']=data.sku
//   //     data2['gstid']=data.gstid
//   //     data2['price'] = data.price
//   //     data2['qty']=data.qty
//   //   })
//   // })
//   // console.log(data2);
//   // product_update = await Product.findByIdAndUpdate(
//   //   data2.id,
//   //   { $set: {qty:data2.qty-qty} },
//   //   { new: true }
//   // );
//   // await Sellreport.create({
//   //   party_name: data2.party_name,
//   //   name:data2.name,
//   //   sku:data2.sku,
//   //   gstid:data2.gst,
//   //   price:data2.price,
//   //   qty
//   // }).then((result) => {
//   //   return res.status(200).send(successmessage(['Successfully'],[result]))
//   // }).catch((error) => {
//   //   console.log(error);
//   //   return res.status(500).send(errormessage(error))
//   // })

//   // ===================================> 
//   // let date = new Date().toString()

//   let data2 = {}
//   let lessqty = []
//   let finaldata = []
//   let updatedata = []
//   let id = Date.now()
//   // let random= 0
//   // let min = 2


//   await Product.find({ name: { $in: name } }).then(e => {
//     console.log(e)
//     e.map((data, index) => {
//       data2['id'] = data._id
//       data2['party_name'] = data.party_name
//       data2['name'] = data.name
//       data2['sku'] = data.sku
//       data2['gstid'] = data.gstid
//       data2['price'] = data.price
//       data2['qty'] = data.qty
//       console.log(data)
//       finaldata.push({ ...data2 })
//       if (data.qty < qty[index] || data.qty < qty) {
//         lessqty.push({ "name": data.name, "qty": data.qty });
//       }
//     })
//   }).catch((error) => {
//     console.log(error)
//   })
//   // console.log(finaldata)

//   await party.find({ user: req.user }).then((res) => {
//     res.map((e) => {
//       finaldata.map((pro) => {
//         if (e._id.equals(pro.party_name)) {
//           updatedata.push({ ...pro })
//         }
//       })
//     })
//   }).catch((error) => {
//     console.log(error)
//   })

//   try {
//     let billreports = []
//     for (let a = 0; a < updatedata.length; a++) {
//       if (lessqty.length > 0) {
//         return res.status(402).send(errormessagewith(`max qty ${lessqty[a].qty} of product ${lessqty[a].name}`))
//       } else {
//         console.log(qty[a])
//         await Product.findByIdAndUpdate(
//           updatedata[a].id,
//           { $set: { qty: updatedata[a].qty - (qty[a] || qty) } },
//           { new: true }
//         ).then(result => {
//           console.log('reskhkl', result);
//         }).catch(error => {
//           console.log(error);
//         })

//         let billreport = await Sellreport.create({
//           party_name: updatedata[a].party_name,
//           name: updatedata[a].name,
//           sku: updatedata[a].sku,
//           gstid: updatedata[a].gstid,
//           price: updatedata[a].price,
//           qty: qty[a] || qty,
//           bill_id: id
//         })
//         billreports.push(billreport)
//       }
//     }
//     return res.status(200).send(successmessage(['Successfully'], billreports))
//   } catch (error) {
//     console.log(error);
//     return res.status(402).send(errormessage(['fail'], error))
//   }
// })

let finaldata = []
let lessqty = []
let updatedata = []
let billreports = []
router.post('/bill', async (req, res) => {
  const { name } = req.body
  finaldata = []
  lessqty = []
  updatedata = []
  let id = Date.now()
  let data2 = {}
  let dtadtds = []
  name.map(async (e, index) => {
    Product.find({ sku: e.sku }).then((data) => {
      data2['id'] = data[0]._id
      data2['party_name'] = data[0].party_name
      data2['name'] = data[0].name
      data2['sku'] = data[0].sku
      data2['gstid'] = data[0].gstid
      data2['price'] = data[0].price
      data2['qty'] = data[0].qty
      finaldata.push({ ...data2 })
      if (data[0].qty < e.qty) {
        lessqty.push({ "name": data[0].name, "qty": data[0].qty });
      }
    }).catch((err) => {
      console.log(err)
      return res.status(500).send(errormessage(err))
    })
  })

  await party.find({ user: req.user }).then((res) => {
    res.map((e) => {
      finaldata.map((pro) => {
        if (e._id.equals(pro.party_name)) {
          updatedata.push({ ...pro })
        }
      })
    })
  }).catch((error) => {
    console.log(error)
  })
  console.log('qty', lessqty)

  try {

    for (let a = 0; a < updatedata.length; a++) {
      if (lessqty.length > 0) {
        return res.status(402).send(errormessagewith([`max qty ${lessqty[a].qty} of product ${lessqty[a].name}`]))
      } else {
        name.map(async (e) => {
          if (e.sku === updatedata[a].sku) {
            await Product.findByIdAndUpdate(
              updatedata[a].id,
              { $set: { qty: updatedata[a].qty - Math.floor(e.qty) } },
              { new: true }
            ).then(result => {
              console.log('update record', result);
            }).catch(error => {
              console.log(error);
            })


            let billreport = await Sellreport.create({
              party_name: updatedata[a].party_name,
              name: updatedata[a].name,
              sku: updatedata[a].sku,
              gstid: updatedata[a].gstid,
              price: updatedata[a].price,
              qty: Math.floor(e.qty),
              bill_id: id
            })
            billreports.push(billreport)
          }
        })
      }
    }
    return res.status(200).send(successmessagewith(['Successfully']))
  } catch (error) {
    console.log(error);
    return res.status(402).send(errormessage(['fail'], error))
  }
})

module.exports = router;