const express = require("express")
const router = express.Router();
const passport = require("passport")
const UserModel = require("../Models/UserModel")

// to create new user

router.post("/", async(req,res)=>{
    try {
        console.log("here");
        const newUser = await UserModel.create(req.body);
        await newUser.save()
        res.status(201).send(newUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

// to login existing user

router.post("/login",passport.authenticate("local"), async (req,res)=>{
    res.status(200).send(req.user)
})

// get all students

router.get("/allStudents", async (req,res)=>{
    try {
        if (!req.user) return res.status(200).send({message:"please authenticate!!"})
        if (req.user.role === "student") return res.status(200).send({message:"students cannot see all students"})
        const allStudents = await UserModel.find({role:"student"});
        res.status(200).send(allStudents)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router