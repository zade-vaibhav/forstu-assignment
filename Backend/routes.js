const express = require("express");
const router = express.Router()
const multer = require("multer");
const excelToJson = require('convert-excel-to-json');
const profile = require('./schema/studentProfile')


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

        const data = result.Sheet1;
        let Studentdata = []
        for (let i = 0; i < data.length; i++) {
            const newData = {}
            newData.name = data[i].A;
            newData.email = data[i].B;
            newData.enrollment_date = `${data[i].C} ${Date.now()}`;

            const isPresent = await profile.find({ email: data[i].B })
            if (isPresent.length) {
                res.status(400).send("email already present check sheet again")
                Studentdata = []
                break;
            }
            Studentdata.push(newData);
        }

        for (let i = 0; i < Studentdata.length; i++) {
            const studentProfile = new profile(Studentdata[i]);
            await studentProfile.save();
        }
        if(Studentdata.length){
        res.status(200).send("data saved")
        }
    }

})


module.exports = router