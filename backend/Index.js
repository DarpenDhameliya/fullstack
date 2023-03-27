const express = require('express')
const app = express()
const mongoconnect = require('./db')
var bodyParser = require('body-parser')
// const passport = require('passport');
// const cookieSession = require('cookie-session');

mongoconnect();
var cors = require('cors');
// const { session } = require('passport');
app.use(cors())
// app.use(cookieSession({name:"session",keys:["sstpl"] , maxAge:24*60*60*100}))
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api',require('./routs/Index'))

app.listen(4000 ,() => {
  console.log('running 4000')
})