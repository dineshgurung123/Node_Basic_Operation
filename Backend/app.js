const express = require('express')
 const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
require('dotenv').config()
 const fs = require('fs')
const cors = require('cors')


const app = express()

app.use(cors(
  {

origin : "http://localhost:5173"
}

))

connectToDatabase()


app.use(express.json())
const {multer, storage} = require('./middleware/multerConfig')

const upload = multer({storage : storage})


app.get("/", (req, res)=>{


res.json({
    message : "This is home page"
})

})

 
app.post("/blog", upload.single('image'),  async(req, res)=>{

  const {title, subtitle, description} = req.body

   const {filename} = req.body
   
  if(!title || !subtitle || !description){
    return res.status(400).json({
        message : "Please provide full detail"
    })
  }

 await Blog.create({
    
    title : title, 
    subtitle : subtitle,
    description : description, 
    image : filename
  })

res.status(200).json({
    message : "Blog api hit successfully"
})

})


app.get("/blog", async(  req,res)=>{

 const blogs = await Blog.find()
  res.status(200).json({
    message : "Blogs feyched successfully",
    data : blogs
  }) 
  
})


app.get("/blog/:id", async(req, res)=>{

  const id = req.params.id.trim()

   const blog  =  await Blog.findById(id) //object

   if(!blog){
  return res.status(404).json({

        message : "No data found"
    })

   }else{
    res.status(200).json({
        message : "Data found",
        data : blog
    })
   }

})


app.delete("/blog/:id", async(req, res)=>{
 
     const id = req.params.id.trim()
     const blog = await Blog.findById(id)
      // const imageName = blog.image

     
//       fs.unlink(`storage/${imageName}`, (err)=>{
//     if(err){
//         console.log(err)
//     }
// else{
//     console.log("File deleted successfully")
// }

//       })

      await Blog.findByIdAndDelete(id)

      res.status(200).json({
        message : "Blog deleted successfully"
      })

})


app.patch("/blog/:id", async(req, res)=>{
const id = req.params.id
let imageName
const{title, subtitle, description} = req.body

if(req.file){
   imageName = req.file.filename

    const blog = await Blog.findById(id)
    const imageName = blog.image
    
    
    fs.unlink(`storage/${imageName}`, (err)=>{
    if(err){
      console.log(err)
    }
    else{
    console.log("File deleted successfully")
    }
    
    })
    
}





await Blog.findByIdAndUpdate(id,{
 
    title: title,
    subtitle : subtitle,
    description : description,
     image : imageName
})

res.status(200).json({
    message : "Blog Updated"
})

})


app.listen(process.env.PORT, ()=>{
     
    console.log("Nodejs ")
})
