const mongoose = require('mongoose')

let paymentSchema = mongoose.Schema({
    name: {
        type: String,
        require: ["Name is not empty"]
    },

    numberID: {
        type: Number,
        default: 0
    },

    card:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    },

}, {timestamps: true})

module.exports = mongoose.model('Payment', paymentSchema)