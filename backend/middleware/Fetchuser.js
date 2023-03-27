var jwt = require('jsonwebtoken');
const JWT_SECRET = "darpendHameliya";
const { errormessage } = require('../response/Response')
const user = require('../model/UserSchma')
const fetchuser = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(req.header)
  if (!token) {
    return res.status(401).send(errormessage("Please Add token "))
  } else {
    try {
      // user.find({},{_v:0}).then((r) => {
      //   r.map(e => {
      //     if(e.token == token){
      //       console.log(e)
      //     } else {
      //       console.log('else')
      //     }
      //   })
      // })
      const match_user = jwt.verify(token, JWT_SECRET);
      req.user = match_user.User_id
      req.user_name = match_user.name
      next()
    } catch (error) {
      console.log(error)
      res.status(401).send(errormessage("Token Mismatch"))
    }
  }
}


module.exports = fetchuser;