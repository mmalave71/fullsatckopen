const mongoose=require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {type: String,minlength:5,required:true},
    author: {type:String, minlength:3,required:true},
    url: {type:String,minlength:10,requerided:true},
    likes: Number,
    user:{type: mongoose.Schema.Types.ObjectId ,ref:'User'},
    comments:[{type:String, minlength:3}]
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports= mongoose.model('Blog', blogSchema)