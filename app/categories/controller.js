const res = require('express/lib/response')
const Categories = require('./model')

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

            const categories = await Categories.find()
            
            res.render('admin/categories/view_categories',{
                categories,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/categories')
        }
    },

    viewCreate : async(req, res)=>{
        try {
            res.render('admin/categories/create')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/categories')
        }
    },

    actionCreate : async(req, res)=>{
        try {
            const {name} = req.body
            
            let categories = await Categories({ name })
            await categories.save();

            req.flash('alertMessage', "Success Create Categories")
            req.flash('alertStatus', "success")
            req.flash('alertName', req.body.name)

            res.redirect('/categories')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/categories')
        }
    },

    viewedit : async(req, res)=>{
        try {
            const {id} = req.params

            const categories = await Categories.findOne({_id : id})

            res.render('admin/categories/edit',{
                categories
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/categories')
        }
    },

    actionEdit : async(req, res)=>{
        try {
            const {id} = req.params
            const {name} = req.body

            const categories = await Categories.findOneAndUpdate({_id: id}, {name})
            req.flash('alertMessage', "Success Edit Data Categories")
            req.flash('alertStatus', "warning")
            req.flash('alertName', req.body.name)

            res.redirect('/categories')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/categories')
        }
    },

    actionDelete : async(req, res)=>{
        try {
            const {id} = req.params
            
            const categories = await Categories.findOneAndRemove({_id: id})

            req.flash('alertMessage', "Success Deleting Data Categories")
            req.flash('alertStatus', "danger")


            res.redirect('/categories')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/categories')
        }
    }
}