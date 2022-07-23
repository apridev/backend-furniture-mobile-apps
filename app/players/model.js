const mongoose = require('mongoose')

let apiSchema = mongoose.Schema({
    name: {
        type: String,
        require: ["Name product is not empty"]
    },

    thumbnail:{
        type:String,
    },

    categories:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },

    price: {
        type: Number,
        default: 0
    },

    rating: {
        type: String,
        require: ['Rating is not empty']
    },

    review:{
        type: Number,
        default:0
    },

    description:{
        type: String,
        require: ['Description is not empty']
    },

    colors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Colors"
    }],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

module.exports = mongoose.model('Api', apiSchema)