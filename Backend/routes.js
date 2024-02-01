const express = require("express");
const router = express.Router()
const multer = require("multer");
const excelToJson = require('convert-excel-to-json');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileData = multer({ storage })



router.post('/uploadfile', fileData.single("file"), async (req, res) => {

    if (req.file?.filename == null || req.file?.filename == "undefined") {

        res.status(400).send("no file")

    } else {

        const path = req.file.path;
        const result = excelToJson({
            sourceFile: path
        });
        
    }

})

module.exports = router