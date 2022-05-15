const {Schema, model} = require("mongoose");
const {isEmail} = require("validator")

const userSchema = new Schema(
    {
        userName:{
            type:String,
            unique:true,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate: [isEmail, 'invalid email']
        },
        thoughts:[
            {
                type:Schema.Types.ObjectId,
                ref:"thought"
            }
        ],
        friends:[
            {
                type:Schema.Types.ObjectId,
                ref:"user"
            }
        ]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: true,
      }
)

userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
})

const User = model("user",userSchema)

module.exports = User;