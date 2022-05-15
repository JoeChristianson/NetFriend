const {Schema, model} = require("mongoose")
const Reaction = require("./reaction")

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type:String,
            required:true,
            maxlength:280,
            minlength:1
        },
        createdAt:{
            type:Date,
            default: new Date(),
            
        },
        username:{
            type:String,
        required:true
    },
    reactions:[Reaction]
    },
    {
        toJSON:{
            virtuals:true
        },
        id:false
    }
)

// create a getter function for created at so it formats the date correctly

thoughtSchema.virtual("getFormattedDate").get(function(){
    return this.createdAt.toDateString;
})

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})

const Thought = model("thought",thoughtSchema)

module.exports = Thought;