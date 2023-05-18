const express = require("express");
const router = new express.Router();
const users = require("./models/users");
const nodemailer = require("nodemailer");

// email config
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        users:process.env.EMAIL,
        password:process.env.PASS
    }
});

// register user details 

router.post("./register",async (req,res)=>{
    const {firstname, lastname, email, mobile, message} = req.body;
    if(!firstname || !lastname || !email || !mobile){
        response.status(401).json({status:401,error:"All Input required"});
    }
    try{
        const preuser = await users.findOne({email: email});
        
            if (preuser){
                console.log("Already Exists");
            }else{
                const finaluser = new users({
                    firstname, lastname, email, mobile, message
                });
                const storeData = await finaluser.save();

                const mailOptions = {
                    from:process.env.Email,
                    to:email,
                    subject:"Getting your response",
                    text:"Your response has been submitted"
            }

            transporter.sendMail(mailOptions,(error,info) =>{
                if(error){
                    console.log("error" + error);
                }else{
                    console.log("email sent successfully" + info.response);
                    res.status(201).json({status:201,message:"Email sent successfully"})
                }
            });
            res.status(201).json({status:201,storeData})
        }

    }catch (error){
        response.status(401).json({status:401,error:"All Input required"});
        console.log("catch error");
    }
})




module.exports = router;