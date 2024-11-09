const mongoose = require('mongoose')

function connectToDatabase(params) {
    
    mongoose.connect(process.env.MONGODB_URI)
    console.log("database connected")
}

module.exports = connectToDatabase