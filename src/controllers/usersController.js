const {hash, compare} = require("bcryptjs")
const AppError = require("../utils/appError")
const knex = require("../database/knex")

class usersController{
    async create(request, response){
        const {name, password, email} = request.body
        
        const userExist = await knex("users").where({email})

        if(userExist){
            throw new AppError("Este e-mail já esta em uso")
        }

        // await knex("users").insert({
        //     name,
        //     password,
        //     email
        // })

        response.json()
    }
}

module.exports = usersController