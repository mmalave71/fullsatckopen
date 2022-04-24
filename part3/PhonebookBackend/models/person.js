//Conectarme a la base de datos y retornar el modelo
const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')
const MONGODB_URI=process.env.MONGODB_URI
//const MONGODB_URI=process.env.MONGODB_URI_LOCAL //  Para usar bd Local

console.log('Connecting to:',MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(  bd  => {
    console.log('Bd Connected')
  })
  .catch(e => console.log('Ha ocurrido el siguiente error:',e))


const personSchema = new mongoose.Schema({
  name:{ type:String, minlength:3, required:true, unique:true },
  number:{ type:String, minlength:8, required:true }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Person',personSchema)