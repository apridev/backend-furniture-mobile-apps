const res = require('express/lib/response')
const Payment = require('./model')
const Card = require('../card/model')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alertName = req.flash("alertName")

            const alert = {
                message: alertMessage,
                status: alertStatus,
                name: alertName
            }

            const payment = await Payment.find()
            .populate('card')
            
            res.render('admin/payment/view_payment',{
                payment,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    viewCreate : async(req, res)=>{
        try {
            const card = await Card.find()
            res.render('admin/payment/create',{
                card
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionCreate : async(req, res)=>{
        try {
            const {name, numberID, card} = req.body
            
            let payment = await Payment({ name, numberID, card })
            await payment.save();

            req.flash('alertMessage', "Success Create Payment")
            req.flash('alertStatus', "success")
            req.flash('alertName', req.body.name)

            res.redirect('/payment')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    viewedit : async(req, res)=>{
        try {
            const {id} = req.params

            const card = await Card.find()
            const payment = await Payment.findOne({_id : id})
            .populate('card')

            res.render('admin/payment/edit',{
                card,
                payment
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionEdit : async(req, res)=>{
        try {
            const {id} = req.params
            const {name, card, numberID} = req.body

            const payment = await Payment.findOneAndUpdate({_id: id}, {name, card, numberID})
            req.flash('alertMessage', "Success Edit Data")
            req.flash('alertStatus', "warning")
            req.flash('alertName', req.body.name)

            res.redirect('/payment')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionDelete : async(req, res)=>{
        try {
            const {id} = req.params
            
            const payment = await Payment.findOneAndRemove({_id: id})

            req.flash('alertMessage', "Success Deleting Data Payment")
            req.flash('alertStatus', "danger")


            res.redirect('/payment')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    }
}