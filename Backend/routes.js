const express = require("express");
const router = express.Router()
const multer = require("multer");
const excelToJson = require('convert-excel-to-json');
const profile = require('./schema/studentProfile')
const nodemailer = require("nodemailer");


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
        if (Studentdata.length) {
            res.status(200).send("data saved")
        }
    }

})


router.get('/emailsent', async (req, res) => {
    const studentdata = await profile.find();


    //send email with node mailer
    //1 transfer protocal
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "vaibhavzade802@gmail.com",
            pass: 'lfwa nazr brgr qzyh'
        }
    })

    // 2 config content



    //3 send email;

    for (let i = 0; i < studentdata.length; i++) {

        const mailOption = {
            from: 'vaibhavzade802@gmail.com',
            to: `${studentdata[i].email}`,
            subject: "welcome",
            text: "for adding further detail go to the link",
            html: `<p>For scholership purpose please fill the given form </p><p>click here : <a href="http://localhost:3000/student-form?id=${studentdata[i].id}">link</a></p>`
        }

        try {
            const result = await transporter.sendMail(mailOption)
            console.log("email sent sucessfully")
        } catch (err) {
            console.log("email send fail with error ", err)
        }
    }


})

//find student
router.post("/student", async (req, res) => {
    const data = await profile.findById(req.body.id)
    if (data) {
        res.status(200).send(data)
    } else {
        res.status(400).send("no student found")
    }

})


//update student
router.post("/update-student", async (req, res) => {
    const data = req.body;
    let scholershipPercentage = '';
    const percentage = Math.floor((Number(req.body.academic.english) + Number(req.body.academic.hindi) + Number(req.body.academic.maths) + Number(req.body.academic.science) + Number(req.body.academic.project)) / 500 * 100);
   
    if (Number(data.income) < 500000 && percentage > 60) {
        scholershipPercentage = "70%";
    }
    if (Number(data.income) < 500000 && percentage > 50 && percentage<60) {
        scholershipPercentage = "50%"
    }
    if (Number(data.income) < 500000 && percentage > 50) {
        scholershipPercentage = "50%"
    }
    if (Number(data.income) < 500000 && percentage < 50) {
        scholershipPercentage = "40%"
    } else {
        scholershipPercentage = "20%"
    }

    // update scholer ship

    const schlorship = {
        status: "sucess",
        percentage: scholershipPercentage
    }

    console.log(scholershipPercentage)
    try {
        const update = await profile.updateOne(
            { _id: req.body.id },
            {
                $set: {
                    acedemic_data: req.body,
                    schlorship: schlorship
                }
            },
            { new: true })

        console.log(update)
        res.send("updated")
    } catch (err) {
        console.log(err)
    }

})


module.exports = router