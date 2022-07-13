const res = require('express/lib/response')
const Colors = require('./model')

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

            const colors = await Colors.find()
            
            res.render('admin/colors/view_colors',{
                colors,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/colors')
        }
    },

    viewCreate : async(req, res)=>{
        try {
            res.render('admin/colors/create')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/colors')
        }
    },

    actionCreate : async(req, res)=>{
        try {
            const {name} = req.body
            
            let colors = await Colors({ name })
            await colors.save();

            req.flash('alertMessage', "Success Create Colors")
            req.flash('alertStatus', "success")
            req.flash('alertName', req.body.name)

            res.redirect('/colors')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/colors')
        }
    },

    viewedit : async(req, res)=>{
        try {
            const {id} = req.params

            const colors = await Colors.findOne({_id : id})

            res.render('admin/colors/edit',{
                colors
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/colors')
        }
    },

    actionEdit : async(req, res)=>{
        try {
            const {id} = req.params
            const {name} = req.body

            const colors = await Colors.findOneAndUpdate({_id: id}, {name})
            req.flash('alertMessage', "Success Edit Data Colors")
            req.flash('alertStatus', "warning")
            req.flash('alertName', req.body.name)

            res.redirect('/colors')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/colors')
        }
    },

    actionDelete : async(req, res)=>{
        try {
            const {id} = req.params
            
            const colors = await Colors.findOneAndRemove({_id: id})

            req.flash('alertMessage', "Success Deleting Data Categories")
            req.flash('alertStatus', "danger")


            res.redirect('/colors')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/colors')
        }
    }
}