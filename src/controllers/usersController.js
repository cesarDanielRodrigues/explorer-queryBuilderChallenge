const {hash, compare} = require("bcryptjs")
const knex = require("../database/knex")

class usersController{
    create(request, response){
        const {name, password} = request.body
        
    }
}

module.exports = usersController