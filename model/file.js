const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const transporter = require("../config/transpoter")
require("dotenv").config()
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    ImageUrl:{
        type:String

    },
    tags:{
        type:String

    },
    email:{
        type:String

    },
})
// post middlewre for mailsend after the file uploadd to clodinary for db me entry save hone ke baad

fileSchema.post("save", async function(doc){
    try{
        console.log("DOC", doc);
            // ye wala logic config folder me  likho toh jada accha rahta hai so maine config folder me kr diya hai isko that shit
    //    let transporter = nodemailer.createTransport({
    //     host:process.env.MAIL_HOST,
    //     auth:{
    //         user:process.env.MAIL_USER,
    //         pass:process.env.MAIL_PASS
    //     }
         
    //    });

       //send email

       let info = await transporter.sendMail({
        from:`Anubhav Verma`,
        to: doc.email, // doc me saara data aaata hai jo db me save hota hai uski email me mujehe send krna hai
        subject: "New File Uploaded on Cloudinary",
        html:`<h2>Hi Anubhav This Side </h2> <p> File uploaded view here: <a href= "${doc.ImageUrl}">${doc.ImageUrl}</a> </p>`,
       })
       console.log("INFO", info);


    }
    catch(err){
        console.log(err);
        response.status(200).json({
            success:true,
            message:"Something went wrong in email sending!",
            error:message.err
        })


    }
})




module.exports = mongoose.model("Cloudinary", fileSchema);