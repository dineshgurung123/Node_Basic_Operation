const mongoose = require('mongoose')


 const blogSchema =  mongoose.Schema({

      title :{
        type : String,
        unique : true
      },
      subtitle :{
        type : String,
        unique : true
      },
      description:{
        type : String,
        unique : true
      },
      
       image :{
        type : String
       }

})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog