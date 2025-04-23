const mongoose = require('mongoose')
require("dotenv").config()
const dbconnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB Connection Sucesfull")

    })
    .catch((err)=>{
        console.log(err);
        console.log("Issue in DB connection")

    })
    
}
module.exports = dbconnect