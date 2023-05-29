const express = require("express");
const router = express.Router();
const User = require("../model/UserSchma");
// const PartySchema = require("../model/partySchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "darpendHameliya";
const { successmessage, errormessage } = require("../response/Response");
// const passport = require('passport');

router.post("/signup", async (req, res) => {
  // console.log('==========>',req.body);
  const { name, email, password, admin } = req.body;
  let finduser = await User.find({ email: req.body.email });
  console.log(finduser);

  let error = [];
  if (finduser.length > 0 || !name || !email || !password) {
    if (finduser.length > 0) {
      error.push("User already Exist");
    }
    if (!name) {
      error.push("Name Field Require");
    }
    if (!email) {
      error.push("Email Field Require");
    }
    if (!password) {
      error.push("Password Field Require");
    }
    return res.status(400).send(errormessage(error));
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const encyptpassword = await bcrypt.hash(password, salt);
      User.create({
        name,
        email,
        admin,
        password: encyptpassword,
      });
      return res.status(200).send(successmessage("User Create Successfully"));
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body)
  let finduser = await User.findOne({ email });
  let error = [];
  if (!email || !password || (!finduser && email)) {
    if (!email) {
      error.push("Email Require !");
    }
    if (!password) {
      error.push("Password Require !");
    }
    if (!finduser && email) {
      error.push("user not exist");
    }
    return res.status(402).send(errormessage(error));
  } else {
    try {
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        finduser.password
      );
      if (passwordCompare === true) {
        const data = {
          User_id: finduser.id,
          password: finduser.password,
          name: finduser.name,
          
        };

        const authToken = await jwt.sign(data, JWT_SECRET, {
          expiresIn: "24h",
        });
        // let partydata = await PartySchema.find({ party_name: finduser.name });
        await User.updateOne(
          { _id: finduser._id },
          {
            $set: { token: authToken },
          }
        );
        return res.status(200).send(successmessage(authToken));
      } else {
        return res.status(402).send(errormessage(["password mismatch"]));
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(errormessage(error));
    }
  }
});

module.exports = router;
