require('dotenv').config()

const MONGODB_URI=process.env.MONGODB_URI
let MONGODB_URI_LOCAL=process.env.MONGODB_URI_LOCAL
const PORT=process.env.PORT
if (process.env.NODE_ENV==='test'){
    MONGODB_URI_LOCAL=process.env.MONGODB_URI_TEST
}
module.exports={MONGODB_URI,MONGODB_URI_LOCAL,PORT}