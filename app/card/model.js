const mongoose = require('mongoose')

let cardSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name Card is not empty']
    }
}, {timestamps: true})

module.exports= mongoose.model('Card', cardSchema)