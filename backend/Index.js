const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const mongoconnect = require('./db')
// const strem = require('./Stream')
var bodyParser = require('body-parser')
// const passport = require('passport');
// const cookieSession = require('cookie-session');
mongoconnect();
var cors = require('cors');
// const { session } = require('passport');
// app.use('/',express.static('public'))
app.use(express.static('view'))

app.use(cors())
// app.use(cookieSession({name:"session",keys:["sstpl"] , maxAge:24*60*60*100}))
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api',require('./routs/Index'))

app.get('/' , (req,res) => {
  let txtfile = './view/uploads/51381968741019242.txt'
  let strdata = fs.createReadStream(txtfile)
  // return res.send(strdata)

  strdata.on('data',(chunkdata) => {
  console.log(chunkdata)
  res.write(chunkdata)
})

strdata.on('end',() => {
  res.end()
})
strdata.on('error',(err) => {
  console.log(err)
  res.end('file not found')
})
// console.log(strdata)
})
// app.get('/' , strem())
app.listen(4000 ,() => {
  console.log('running 4000')
})