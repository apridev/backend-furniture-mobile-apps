const res = require('express/lib/response')
const Card = require('./model')

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

            const card = await Card.find()
            
            res.render('admin/card/view_card',{
                card,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/card')
        }
    },

    viewCreate : async(req, res)=>{
        try {
            res.render('admin/card/create')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/card')
        }
    },

    actionCreate : async(req, res)=>{
        try {
            const {name} = req.body
            
            let card = await Card({ name })
            await card.save();

            req.flash('alertMessage', "Success Create Card")
            req.flash('alertStatus', "success")
            req.flash('alertName', req.body.name)

            res.redirect('/card')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/card')
        }
    },

    viewedit : async(req, res)=>{
        try {
            const {id} = req.params

            const card = await Card.findOne({_id : id})

            res.render('admin/card/edit',{
                card
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/card')
        }
    },

    actionEdit : async(req, res)=>{
        try {
            const {id} = req.params
            const {name} = req.body

            const card = await Card.findOneAndUpdate({_id: id}, {name})
            req.flash('alertMessage', "Success Edit Data")
            req.flash('alertStatus', "warning")
            req.flash('alertName', req.body.name)

            res.redirect('/card')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/card')
        }
    },

    actionDelete : async(req, res)=>{
        try {
            const {id} = req.params
            
            const card = await Card.findOneAndRemove({_id: id})

            req.flash('alertMessage', "Success Deleting Data")
            req.flash('alertStatus', "danger")


            res.redirect('/card')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/card')
        }
    }
}