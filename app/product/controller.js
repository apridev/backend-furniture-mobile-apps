const res = require('express/lib/response')
const Product = require('./model')
const Categories = require('../categories/model')
const Colors = require('../colors/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

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

            const product = await Product.find()
            .populate('categories')
            .populate('colors')
            
            res.render('admin/product/view_product',{
                product,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/product')
        }
    },

    viewCreate : async(req, res)=>{
        try {
            const categories = await Categories.find()
            const colors = await Colors.find()
            res.render('admin/product/create', {
                categories,
                colors
            })

        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/product')
        }
    },

    actionCreate : async(req, res)=>{
        try {
            const {name, categories, colors, price, rating, review, description} = req.body

            if(req, res){
                let tmp_path= req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length -1];
                let filename= req.file.filename + '.' + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)

                src.on('end', async ()=>{
                    try {
                        const product = new Product({
                            name,
                            categories,
                            colors,
                            price,
                            rating,
                            review,
                            description,
                            thumbnail: filename
                        })

                        await product.save();
                        req.flash('alertMessage', "Success Create Categories")
                        req.flash('alertStatus', "success")
                        req.flash('alertName', req.body.name)

                        res.redirect('/product')
                    } catch (error) {
                        req.flash('alertMessage', `${err.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/product')
                    }
                })
            } else {
                const product = new Product({
                    name,
                    categories,
                    colors,
                    price,
                    rating,
                    review,
                    description,
                })
                await product.save();
                    req.flash('alertMessage', "Success Create Categories")
                    req.flash('alertStatus', "success")
                    req.flash('alertName', req.body.name)

                    res.redirect('/product')
            }
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/product')
        }
    },

    viewedit : async(req, res)=>{
        try {
            const {id} = req.params

            const categories = await Categories.find()
            const colors = await Colors.find()
            const product = await Product.findOne({_id : id})
            .populate('categories')
            .populate('colors')

            res.render('admin/product/edit',{
                product,
                categories,
                colors
            })
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/product')
        }
    },

    actionEdit :async(req, res)=>{
        try {
            const { id } = req.params
            const { name, categories, colors, price, rating, review, description } = req.body
      
            if(req.file){
              let tmp_path= req.file.path;
              let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
              let filename = req.file.filename + '.' + originaExt;
              let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)
      
              const src = fs.createReadStream(tmp_path)
              const dest = fs.createWriteStream(target_path)
      
              src.pipe(dest)
      
              src.on('end', async ()=>{
                try {
      
                  const product = await Product.findOne({_id: id})
      
                  let currentImage = `${config.rootPath}/public/uploads/${product.thumbnail}`;
                  if(fs.existsSync(currentImage)){
                    fs.unlinkSync(currentImage)
                  }
      
                  await Product.findOneAndUpdate({
                    _id : id
                  },{
                    name,
                    categories,
                    colors,
                    price,
                    rating,
                    review,
                    description,
                    thumbnail: filename
                  })
                  
      
                  req.flash('alertMessage', "Success Edit Data")
                    req.flash('alertStatus', "warning")
                    req.flash('alertName', req.body.name)
            
                  res.redirect('/product')
                  
                } catch (err) {
                    req.flash('alertMessage', `${err.message}`)
                    req.flash('alertStatus', 'warning')
                    res.redirect('/product')
                }
              })
            }else{
              await Product.findOneAndUpdate({
                _id : id
              },{
                name,
                categories,
                colors,
                price,
                rating,
                review,
                description,
              })
              
              req.flash('alertMessage', "Success Edit Data")
                    req.flash('alertStatus', "warning")
                    req.flash('alertName', req.body.name)
            
                  res.redirect('/product')
            }
      
          } catch (err) {
            req.flash('alertMessage', `${err.message}`)
                    req.flash('alertStatus', 'warning')
                    res.redirect('/product')
                }
          },

    actionDelete : async(req, res)=>{
        try {
            const {id} = req.params
            
            const product = await Product.findOneAndRemove({_id: id})

            let currentImage = `${config.rootPath}/public/uploads/${product.thumbnail}`;
            if(fs.existsSync(currentImage)){
                fs.unlinkSync(currentImage)
            }

            req.flash('alertMessage', "Success Deleting Data Product")
            req.flash('alertStatus', "danger")


            res.redirect('/product')
        } catch (error) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/product')
        }
    }
}