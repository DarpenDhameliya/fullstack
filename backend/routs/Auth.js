const express = require('express')
const router = express.Router();
const User = require('../model/UserSchma')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "darpendHameliya";
const { successmessage, errormessage } = require('../response/Response');
// const passport = require('passport');

router.post('/signup', async (req, res) => {
    console.log(req.body)
    let finduser = await User.findOne({ email: req.body.email })
    const { name, email, password, admin } = req.body

    let error = []
    if (finduser || !name || !email || !password) {
        if (finduser) {
            error.push("User already Exist")
        }
        if (!name) {
            error.push('Name Field Require')
        }
        if (!email) {
            error.push('Email Field Require')
        }
        if (!password) {
            error.push('Password Field Require')
        }
        return res.status(400).send(errormessage(error))
    } else {
        const salt = await bcrypt.genSalt(10);
        const encyptpassword = await bcrypt.hash(password, salt);
        User.create({
            name,
            email,
            admin,
            password: encyptpassword
        })
        return res.status(200).send(successmessage("User Create Successfully"))
    }

})

router.post('/login', async (req, res) => {
    console.log(req.body.email)
    const { email, password } = req.body
    let finduser = await User.findOne({ email })
    console.log(req)
    let error = []
    if (!email || !password || (!finduser && email)) {
        if (!email) {
            error.push('Email Require !')
        }
        if (!password) {
            error.push('Password Require !')
        }
        if (!finduser && email) {
            error.push('user not exist')
        }
        return res.status(402).send(errormessage(error))
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
                    name: finduser.name
                };

                const authToken = await jwt.sign(data, JWT_SECRET, { expiresIn: '24h' });
                console.log(finduser._id)
                await User.updateOne(
                    { _id: finduser._id },
                    {
                        $set: { token: authToken },
                    }
                );
                return res.status(200).send(successmessage(authToken))
            } else {
                return res.status(402).send(errormessage(['password mismatch']))
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send(errormessage(error))
        }
    }
})

// router.get("/google", passport.authenticate("google", { scope: ["profile" , "email"] }));

// router.get(
//   "/googleverify",
//   passport.authenticate("google", {
//     successRedirect: "/api/auth/login",
//     failureRedirect: "/api/auth/login",
//   })
// );

// router.get('/googleverify', 
//   passport.authenticate('google', { failureRedirect: console.log('FAIL')  , successRedirect: console.log('yes')}),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     console.log('yes')
//     // res.redirect('/');
//   });


module.exports = router;
