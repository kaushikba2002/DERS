const mongoose=require('mongoose');
const schema=mongoose.Schema;

const ChatSchema=new schema({
    id_no: Number,
    messages:[
        {
            type:String
        }
    ]

})

module.exports=mongoose.model('Chat', ChatSchema);