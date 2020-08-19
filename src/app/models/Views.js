const db = require('../../config/db')

module.exports = {
    all(callback){
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, 
        (err, results)=>{
            if (err) throw `Database Error! ${err}`

        callback(results.rows)
        })
    },
    find(id, callback) {
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id], (err, results)=>{
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
            }
        )
    },
    findChefs(callback){
        db.query(`
        SELECT chefs.*, 
        count(recipes) as total_recipes
        from chefs
        left join recipes on (recipes.chef_id = chefs.id)
        group by chefs.id`, 
        (err, results)=>{
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM recipes
            ) AS total`

        if ( filter ) {
            filterQuery = `
            WHERE recipes.title ILIKE '%${filter}%'
            `

            totalQuery =`(
                SELECT count(*) FROM recipes
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    }
}