const express = require("express")
const bcrypt = require('bcrypt')
const userModel = require("../model/userModel")

const router = express.Router()

// userRoute (CRUD)

// get : all users

router.get('/users',async(req,res)=>{
    try {
        const allUsers = await userModel.find()
        res.send(allUsers)
    } catch (error) {
        res.send(error)
    }
})

// post : 

router.post('/post-user',async(req,res)=>{
    try {
        const {username,email,password} = req.body 
        const user =  await userModel.findOne({email})
       if(user){
         res.send({message:"user already exists"})
       }else{
        const hashPassword = await bcrypt.hash(password,10)
        const newUser =  new userModel({username,email,password:hashPassword}) 
        await newUser.save()
        res.send(newUser)
       }

    } catch (error) {
        res.send(error)
    }
})

// get - get selected users by ID

router.get('/users/:id',async(req,res)=>{
    const id = req.params.id
    try {
        const selectedUser = await userModel.findById(id)
        res.send(selectedUser)
    } catch (error) {
        res.send(error)
    }
})

// put :
router.put('/users/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const {username,email,password} = req.body 
        const user =  await userModel.findOne({email})
        if(user){
            res.send({message:"can't update users, The email ID already exists"})
        }
        else{
            const hashPassword = await bcrypt.hash(password,10)
            await userModel.findByIdAndUpdate(id,{username,email,password:hashPassword})
           res.send({message:"user details updated"})
        }   
    } catch (error) {
        res.send(error)
    }
})

// delete : 

router.delete('/users/:id',async(req,res)=>{
    const id = req.params.id
    try {
        const user =  await userModel.findById(id)
        if(user){
            await userModel.findByIdAndDelete(id)
            res.send({message:"user deleted"})
        }else{
            res.send({message:"user not found"})
        }   
    } catch (error) {
        res.send(error)
    }
})

module.exports = router