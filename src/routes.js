const express = require('express')
const routes = express.Router()
const views = require('./app/controllers/views')

routes.get('/', (req, res)=>{
    return res.redirect('main')
})
routes.get('/about', (req, res)=>{
    return res.render('site/about')
})

routes.get('/main', views.main)
routes.get('/recipe', views.index)
routes.get('/detail/:id', views.show)
routes.get('/chefs', views.chefs)

module.exports = routes
