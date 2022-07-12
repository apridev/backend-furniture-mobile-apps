const mongoose = require('mongoose')

let categoriesSchema = mongoose.Schema({
    name : {
        type : String,
        require: [true, 'Name categories not empty']
    }
}, {timestamps: true})

module.exports = mongoose.model('Categories', categoriesSchema)