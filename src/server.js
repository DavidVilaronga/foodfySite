const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")

const server = express()

server.use(express.urlencoded({ extended:true }))
server.use(express.static('public'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})
    
//server.get("/detail/:id", function(req, res){
//    const detailIndex = req.params.id
//    items.find(function(item){
//        if(item.id==detailIndex){
//            return res.render('detail', {item})
//        }
//    })
//})

server.listen(5000, function(){
    console.log("server is running")
})