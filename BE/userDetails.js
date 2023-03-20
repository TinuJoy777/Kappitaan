const mongoose = require('mongoose')

const UserDetailsScehma = new mongoose.Schema(
  {
    Value: Number,
    FirstName: String,
    LastName: String,
    Email: String,
    Password: String,
  },
  {
    collection: 'Users',
  },
)

mongoose.model('Users', UserDetailsScehma)
