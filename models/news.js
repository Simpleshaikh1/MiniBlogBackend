const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        trim: true
    },
    body: { 
        type: String,
        required: true
    },
    coverImage: { 
        type: String,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
    },
    isTrash:{
        type:Boolean,
        default:false
    },
    authorSchema_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author"
        }
    ]
});

const News = mongoose.model('News', newsSchema);

module.exports =  News 
