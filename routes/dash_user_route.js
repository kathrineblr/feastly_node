const express = require('express');
const { DashUserModel } = require('../models/dash_user_model');
const jwt = require('jsonwebtoken');
const shaToken = require('../middleware/token.json')
const router = express.Router();
const verifyToken = require('../middleware/check_auth');


router.post('/login',async(req,res)=>{
    try{
        const checkMobileNumber = await DashUserModel.findOne({user_name:req.body.user_name})
        if(checkMobileNumber){
           const checkPass = await DashUserModel.findOne({user_name:req.body.user_name,password:req.body.password})
           if(checkPass){
             const  user = {user_name:req.body.user_name,password:req.body.password}
         const accessToken = jwt.sign(user,shaToken.token)
        checkPass.token = accessToken;
              return res.status(200).send({msg:"Successfully login",data:checkPass})
           }
           else{
             return res.status(400).send({msg:"Invalid password"})
           }
        }
        else{
         return res.status(400).send({msg:"Invalid user name"})
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).send({msg:"Somthing error try again"})
    }
})

router.post('/addUser',verifyToken,async(req,res)=>{
    try{
        const checkMobileNumber = await DashUserModel.findOne({user_name:req.body.user_name})
        if(checkMobileNumber){
            return res.status(400).send({msg:"User name already exist"})
        }
        else{
            const user = new DashUserModel(req.body)
            const result = await user.save()
            return res.status(200).send({msg:"User added successfully"})
        }
    }
    catch(e){
        return res.status(500).send({msg:"Something error try again later!"})
    }
})

router.get('/allUsers',verifyToken,async(req,res)=>{
  const data = await DashUserModel.find({})
  return res.status(200).send(data)
})


module.exports = router;