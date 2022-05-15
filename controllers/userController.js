const { rmSync } = require("fs");
const {User} = require("../models");
const { findOneAndUpdate } = require("../models/user");

const getUsers = async (req,res)=>{
    try{
        const users = await User.find().populate("friends") ;
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
}

const addNewUser = async (req,res)=>{
    try{
        const newUser = await User.create(req.body);
        res.status(200).json(newUser)
    }catch(err){
        res.status(500).json(err)
    }
}

const getSingleUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id).populate("friends");
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
}

const updateUser = async (req,res)=>{
    try{

        const user = await User.findOneAndUpdate(
            {_id:req.params.id},
            {$set:req.body},
            {runValidators:true,new:true}
        ).populate("friends")
        if (!user){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            res.json(user)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteUser = async (req,res)=>{
    try{
        const user = await User.findOneAndRemove({_id:req.params.id}).populate("friends")
        if (!user){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            res.status(200).json(user)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const addFriend = async (req,res)=>{
    try{
        const user = await User.findOneAndUpdate(
            {_id:req.params.userId},
            {$addToSet:{friends:req.params.friendId}},
            {runValidators:true,new:true}
        ).populate("friends") 
        if (!user){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            res.status(200).json(user)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const removeFriend = async (req,res)=>{
    try{
        console.log("in it")
        const user = await User.findOneAndUpdate(
            {_id:req.params.userId},
            {$pull:{friends:req.params.friendId}},
            {runValidators:true,new:true}
        ).populate("friends")
        if (!user){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            res.status(200).json(user)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    getUsers,
    addNewUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend

}