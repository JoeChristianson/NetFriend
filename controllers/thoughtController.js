const {Thought} = require("../models")

const getThoughts = async (req,res)=>{
    try{
    const thoughts = await Thought.find();
     res.status(200).json(thoughts)   
    }catch(err){
        res.status(500).json(err)
    }
}

const getSingleThought = async(req,res)=>{
    try{
        console.log("in it")
        const thought = await Thought.findById(req.params.id).populate("reactions");
        
        if(!thought){
            res.status(404).json({message:"no thought with that id"})
        }
        else res.status(200).json(thought)
    }catch(err){
        res.status(500).json(err)
    }
}

const addThought = async(req,res)=>{
    try{
        const thought = await Thought.create(req.body);
        res.status(200).json(thought)
    }catch(err){
        res.status(500).json(err)
    }
}

const updateThought = async(req,res)=>{
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id:req.params.id},
            {$set:req.body},
            {runValidators:true,new:true}
        ).populate("reactions")
        if(!thought){
            res.status(404).json({message:"no thought with that id"})
        }
        else res.status(200).json(thought)
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteThought = async (req,res)=>{
    try{
        const thought = await Thought.findOneAndRemove({
            _id:req.params.id
        })
        if (!thought){
            res.status(404).json({message:"no thought with this id"})
        }
        else{
            res.status(200).json(thought)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const addReaction = async(req,res)=>{
    try{
        console.log("in it")
        const thought = await Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$addToSet:{reactions:req.body}},
            {runValidators:true,new:true}
        )
        console.log("past it")
        if (!thought){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            res.status(200).json(thought)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteReaction = async(req,res)=>{
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$pull:{reactions:{_id:req.body.id}}},
            {runValidators:true,new:true}
        ).populate("reactions")
        if (!thought){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            res.status(200).json(thought)
        }
    }catch(err){
        res.status(500).json(err)
    }
}


module.exports = {
    getThoughts,
    getSingleThought,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
}