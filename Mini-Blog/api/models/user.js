const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true
    },
    userName: { 
        type: String,
        required: true
    },
    passWord: { 
        type: String,
        required: true
    },
    profilePicture:{
        type: String
    },
    isTrash:{
        type:Boolean,
        default:false
    },
    newsSchema_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "News"
        }
]
});

const Author = mongoose.model("Author", authorSchema);
module.exports =  Author 