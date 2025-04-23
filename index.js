const express =  require('express')
const app = express()

require("dotenv").config()

app.use(express.json());

// data base cpoonection ho gya
const dbconnect = require("./config/db")
dbconnect()

// clodinary se connection karenge
const clodinaryconnect = require("./config/cloudinary")
clodinaryconnect();

// file upload mildeware support multer ka bhbi use kr skty hai pr ham ya express file upload ka usea karenge
const fileupload = require("express-fileupload");
// ab is midddleware ko app se mount karenge
// this is a methode
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}))


const PORT = process.env.PORT || 3000

const alluploadhandler = require("./routes/route")
app.use("/api/v1", alluploadhandler);

app.listen(PORT, ()=>{
    console.log(`App iss running succesfully On ${PORT}`);
})