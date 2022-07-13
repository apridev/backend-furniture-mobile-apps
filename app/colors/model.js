const mongoose = require('mongoose')

let colorsSchema = mongoose.Schema({
    name : {
        type : String,
        require: [true, 'Name color not empty']
    }
}, {timestamps: true})

module.exports = mongoose.model('Colors', colorsSchema)