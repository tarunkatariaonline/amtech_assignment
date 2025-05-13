const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()
const userRouter = require('./Routes/user.routes')
const app = express()
const port =  process.env.PORT
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser())
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/',userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})