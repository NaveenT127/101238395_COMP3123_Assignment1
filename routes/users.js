const mongoose = require('mongoose')
const express = require('express')
const userModel = require('../models/users')
const route = express.Router()
route.post('/user/signup', async(req, res) => {
    if(req.body.content) {
        return res.status(400).send({
            message: "User content can't be empty"
        });
    }
    try { 
        const user = new userModel(req.body)
        await user.save()
        res.status(201, { message: "Adding user successfull"}).send(user)
    }
    catch(error) {
        res.status(500).send(error.message)
    }
})
route.post('/user/login', async(req, res) => {
    if(req.body.content) {
        return res.status(400).send({
            message: "User content can't be empty"
        });
    }
    let password = req.body.password
    let userName = req.body.username
    const user = await userModel.findOne({username : userName})

    if(!user) {
        res.status(404).send({"message": "Error in authentification"})
    }
    else if(userName == user.username && password == user.password) {
        res.status(200).send({"status" : true, "username": user.username, message: "Signed in successfull"})
    }
    else {
        res.status(500).send({status: false, message: "Incorrect username or password"})
    }
})
module.exports = route