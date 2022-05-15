const { ObjectId } = require("bson")
const {Schema, Types} = require("mongoose")

const reactionSchema = new Schema(
    {
        reactionId:{
            type:Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody:{
            type:String,
            required:true,
            maxlength:280
        },
        userName:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default: new Date(),
            
        }
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
)

reactionSchema.virtual("getFormattedDate").get(function(){
    return this.createdAt.toDateString;
})

module.exports = reactionSchema