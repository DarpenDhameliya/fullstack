const express = require("express");
const router = express.Router();
const Product = require("../model/ProductSchema");
const party = require("../model/partySchema");
const { successmessage, errormessage } = require("../response/Response");

//product list
router.get("/product/list/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  await Product.find({ party_name: id }, { __v: 0 })
    .then((e) => {
      console.log(e);
      return res.status(200).send(successmessage(e));
    })
    .catch((error) => {
      console.log(error);
      return res.status(402).send(errormessage(error));
    });
});

// add product
router.post("/product/add", async (req, res) => {
  // let id = req.params.id
  const { name, sku, gstid, price, qty, party_id } = req.body;
  let skutaken = false;
  await Product.find({ party_name: party_id }).then((e) => {
    // eslint-disable-next-line array-callback-return
    e.map((data) => {
      if (data.sku === sku) {
        return (skutaken = true);
      }
    });
  });
  console.log(req.body)
  let error = [];
  if (!name || !sku || !gstid || !party_id || !price || !qty) {
    if (!name) {
      error.push("Name Require");
    }
    if (!sku) {
      error.push("sku Require");
    }
    if (!gstid) {
      error.push("gstid Require");
    }
    if (!price) {
      error.push("Price Require");
    }
    if (!qty) {
      error.push("qty Require");
    }
    if (!party_id) {
      error.push("party name(id) Required ");
    }
    return res.status(400).send(errormessage(error));
  } else {
    if (skutaken === false) {
      const product = new Product({
        name,
        sku,
        gstid,
        price,
        qty,
        party_name: party_id,
      });
      await product.save().then(() => {
        res.status(200).send(successmessage(["product added successfully"]));
      });
    } else {
      res.status(402).send(errormessage(["sku taken"]));
    }
  }
});

// for get specific record for update
router.post("/product/update/:id", async (req, res) => {
  let id = req.params.id;
  let partyid = "";
  let modified = false;

  let fetchdata = await Product.findOne({ _id: id }, { __v: 0 })
    .then((res) => {
      partyid = res.party_name;
      return res;
    })
    .catch((err) => {
      return res.status(500).send(errormessage(err));
    });

  await party.find({ user: req.user }).then((e) => {
    e.map((data) => {
      if (data._id.equals(partyid)) {
        modified = true;
      }
    });
  });

  if (modified === true) {
    return res
      .status(200)
      .send(successmessage(fetchdata, ["data get successfully"]));
  } else {
    return res.status(402).send(errormessage(["Id mismatch"]));
  }
});

router.put("/product/finalupdate", async (req, res) => {
  let { name, qty, price, gstid, skuid } = req.body;

  let partyid = "";
  let modified = false;
  let new_data = {};

  await Product.findOne({ _id: skuid }, { __v: 0 })
    .then((res) => {
      partyid = res.party_name;
      return res;
    })
    .catch((err) => {
      return res.status(500).send(errormessage(err));
    });

  await party.find({ user: req.user }).then((e) => {
    e.map((data) => {
      if (data._id.equals(partyid)) {
        modified = true;
      }
    });
  });

  if (modified === true) {
    if (name) {
      new_data.name = name;
    }
    if (qty) {
      new_data.qty = qty;
    }
    if (price) {
      new_data.price = price;
    }
    if (gstid) {
      new_data.gstid = gstid;
    }
    console.log(new_data);

    if (!name || !skuid) {
      return res.status(402).send(errormessage(["Name Required"]));
    } else {
      await Product.findByIdAndUpdate(skuid, { $set: new_data }, { new: true });
      return res
        .status(200)
        .send(successmessage(["party name update successfully"]));
    }
  } else {
    return res.status(402).send(errormessage(["Id mismatch"]));
  }
});

router.delete("/product/delete/:id", async (req, res) => {
  let id = req.params.id;
  let partyid = false;
  let party_product_match = false;

  let fetchdata = await Product.findById({ _id: id }, { __v: 0 });
  if (fetchdata.party_name) {
    partyid = true;
  }

  await party.find({ user: req.user }).then((e) => {
    e.map((data) => {
      console.log("==================>", data);
      if (data._id.equals(fetchdata.party_name)) {
        console.log(data);
        party_product_match = true;
      }
    });
  });
  console.log(party_product_match);
  if (party_product_match === true && partyid === true) {
    await Product.findByIdAndDelete(id)
      .then((result) => {
        return res.status(200).send(successmessage("Product delete success"));
      })
      .catch((err) => {
        return res.status(500).send(errormessage(err));
      });
  } else {
    return res.status(402).send(errormessage("id mismatch"));
  }
});

module.exports = router;
