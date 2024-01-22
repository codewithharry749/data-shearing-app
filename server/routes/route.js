const express = require('express');
const upload = require('../utils/upload');
const File = require('../modules/fileSchema');
const router = express.Router();
require('dotenv').config()


var cloudinarys = require('cloudinary').v2;


router.post('/upload', upload.single('file'), async (req, res, next) => {

    try {
        const name = req.file.filename
        cloudinarys.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.SECRET_KEY
        })

        cloudinarys.uploader.upload(
            `uploads/${name}`, {
            use_filename: true,
            unique_filename: false,
            folder: 'Images'
        },
            async (err, image) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("File uploaded")
                    console.log(image.secure_url)


                    const link = image.secure_url;
                    // const {name , link } = req.body;

                    const response = await File.create({ name, link });
                    await response.save().then(() => {
                        res.status(200).json({
                            data: response,
                            massage: 'Form upload Successfull',
                            success: true
                        })
                    })
                }
            }
        )


    } catch (err) {
        console.log("Error occure in data entry");

    }

});

router.get('/getImagesData', async (req, res) => {
    try {
        const response = await File.find({});
        res.status(200).json({
            success: true,
            data: response,
            massage: "image founded successFully"
        });
    } catch (err) {
        console.error("Error ", err.message)
    }
}
)
module.exports = router;