const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('./userDetails')

const { check, validationResult } = require('express-validator')

app.use(cors())
const User = mongoose.model('Users')

mongoose.connect('mongodb://127.0.0.1:27017/kappitaan')

var db = mongoose.connection

db.on('error', () => console.log('Error in connecting to db'))
db.once('open', () => console.log('Connected to db'))

app.use(
  express.json({
    limit: '1MB',
    type: 'application/json',
  }),
)

app.get('/', async (req, res) => {
  res.send('server')
})
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ Email: email })
  if (!user) {
    return res.json({ error: 'User Not found' })
  }
  res.json({ success: 'User login successfully' })
})

app.post(
  '/signup',
  [
    check('fname', 'First Name Is Required').not().isEmpty(),
    check('lname', 'last Name Is Required').not().isEmpty(),
    check('email', 'Please Use A Valid E-Mail').isEmail(),
    check('password', 'Password Is Required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    console.log(req.body)
    const { value, fname, lname, email, password } = req.body
    const oldUser = await User.findOne({ Email: req.body.email })
    console.log(oldUser)

    if (oldUser) {
      return res.json({ error: 'User Exists' })
    }
    console.log('DB saving')
    await User.create({
      Value: value,
      FirstName: fname,
      LastName: lname,
      Email: email,
      Password: password,
    })
    res.json({ success: 'User Entered successfully' })
  },
)

app.listen(5000, () => {
  console.log('Server Started')
})
