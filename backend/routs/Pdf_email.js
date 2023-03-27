const express = require('express')
const router = express.Router();

const nodemailer = require("nodemailer");
router.post('/pdf', async (req, res) => {
  console.log(req)
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'nilesh.netdeveloper@gmail.com ',
  //     pass: 'a214yeshplaza'
  //   },
  // });

  // let info = await transporter.sendMail({
  //   from: ' <kishan.sstpl@gmail.com>',
  //   to: "darpen.sstpl@gmail.com",
  //   subject: "Hello ✔",
  //   text: "Hello world?",
  //   attachments: [
  //     {
  //       filename: 'C:/Users/Darpen/Downloads/OrderList.pdf',
  //       content: pdf
  //     }
  //   ]
  // });

  // console.log("Message sent: %s", info.messageId);

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
})

module.exports = router

// auth: {
//   user: 'vernie52@ethereal.email',
//   pass: 'MPpzSBpzMhXwjUSPQZ'
// }
