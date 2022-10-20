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
        default: URL
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
    newsSchema_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "News"
        }
    ]
});

const News = mongoose.model('News', newsSchema);

module.exports =  News 