const File = require("../model/file")
const cloudinary = require('cloudinary').v2

const localfileUpload = async (req, res) => {
    try {
        // fetch file from request
        const file = req.files.Anubhavfile
        console.log("file aa gyi hai -->", file)
        // __dirname --> current diectory ya folder ko show krta hai
        // create a path where file need to be store on server 
        // let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.').pop()}`;

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path is -->", path);

        // add path to the move function
        file.mv(path, (err) => {
            if (err) {
                console.log("File move error -->", err);
                return res.status(500).json({
                    success: false,
                    message: "File upload failed",
                    error: err.message
                });
            }

            return res.status(200).json({
                success: true,
                message: "Local file uploaded succesfully",
                data: file
            });
        })

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Not able to upload the file on server",
            error: err.message
        })
    }
}




const Isfiletypesupported = (type, supportedTypes)=>{
    return supportedTypes.includes(type);

}
// function to upload on cloudinary                ,quality
  const uploadFileToCloudinary = async(file, folder, quality )=> {
    const options = {folder};
    // console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto"; // koi bhi file ho skti hai
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


const imageUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body
        const file = req.files.Anubhavfile

        // validation
        const filetypesupported = ["jpg", "jpeg", "png"]
        const filetype = file.name.split('.')[1].toLowerCase();
       

        
        if (! Isfiletypesupported(filetype, filetypesupported)) {
            return res.status(400).json({
                success: false,
                message: 'File type not Supported'
            })
        }
        //  agr file format supported hai then upload to cloudinary on cloudinaryfiles
        console.log("Uploading to cloudinaryfiles");

        const response = await uploadFileToCloudinary(file, "CloudinaryFiles");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            ImageUrl:response.secure_url,
        });
        return res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Successfully Uploaded',
        })

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Not able to upload the image on cloudinary",
            error: err.message
        })
    }
}

const videoUpload = async(req, res)=>{
    try {
        const { name, email, tags } = req.body
        const file = req.files.Anubhavfile

        // validation
        const filetypesupported = ["mp4", "mov"]
        const filetype = file.name.split('.')[1].toLowerCase();
       

        
        if (! Isfiletypesupported(filetype, filetypesupported)) {
            return res.status(400).json({
                success: false,
                message: 'File type not Supported'
            })
        }
        //  agr file format supported hai then upload to cloudinary on cloudinaryfiles
        console.log("Uploading to cloudinaryfiles");

        const response = await uploadFileToCloudinary(file, "CloudinaryFiles");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            ImageUrl:response.secure_url,
        });
        return res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Video Successfully Uploaded',
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Not able to upload the image on cloudinary",
            error: err.message
        })
    }
}
const imageSizeReducer = async(req, res) => {
    try {
        const { name, email, tags } = req.body
        const file = req.files.Anubhavfile

        // validation
        const filetypesupported = ["jpg", "jpeg", "png"]
        const filetype = file.name.split('.')[1].toLowerCase();
       

        
        if (! Isfiletypesupported(filetype, filetypesupported)) {
            return res.status(400).json({
                success: false,
                message: 'File type not Supported'
            })
        }
        //  agr file format supported hai then upload to cloudinary on cloudinaryfiles
        console.log("Uploading to cloudinaryfiles");

        const response = await uploadFileToCloudinary(file, "CloudinaryFiles", 90);
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            ImageUrl:response.secure_url,
        });
        return res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Successfully Uploaded',
        })

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Not able to upload the image with reduce size on cloudinary",
            error: err.message
        })
    }


}
module.exports = {
    localfileUpload,
    imageUpload,
    videoUpload,
    imageSizeReducer,
}
