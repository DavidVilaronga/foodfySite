const Views = require('../models/Views')

module.exports = {
    main(req, res){
        Views.all((recipes)=>{
            return res.render('site/main', {recipes})
        })
    },
    index(req, res){
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes) {
                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }
            return res.render("site/recipe", { recipes, pagination, filter })
            }
        }
        Views.paginate(params)
    },
    show(req, res){
        Views.find(req.params.id, (recipe)=>{
            if (!recipe) return res.send("Recipe not Found!")

            return res.render("site/detail", {recipe})
        })
    },
    chefs(req, res){
        Views.findChefs((chefs)=>{
            return res.render('site/chefs', {chefs})
        })
    }
}