const Players = require('./model')
const Product = require('../product/model')
const { populate } = require('./model')

module.exports = {
    landingpage : async (req, res)=>{
        try {
            const product = await Product.find()
            .select(' _id name categories rating review price thumbnail')
            .populate('categories')
            .populate('colors')

            res.status(200).json({ data: product})
        } catch (error) {
            res.status(500).json({message: error.message || `Terjadi Kesalahan Pada Server`})
        }
    },

    detailPage: async (req,res)=>{
        try {
            const {id} = req.params
            const product = await Product.findOne({ _id : id })
            .populate('categories')
            .populate('colors')

            if(!product){
                res.status(404).json({message: error.message || `Product Tidak Ditemukan`})
            }

            res.status(200).json({ data: product})
        } catch (error) {
            res.status(500).json({message: error.message || `Terjadi Kesalahan Pada Server`})
        }
    }
}