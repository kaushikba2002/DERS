const mongoose=require('mongoose');
const schema=mongoose.Schema;

const UserSchema=new schema({
    id_no: Number,
    messages:[
        {
            type:String
        }
    ],

    image:String,
    rating90:Number,
    x90:Number,
    rating10:Number,
    x10:Number,

})

module.exports=mongoose.model('User', UserSchema);