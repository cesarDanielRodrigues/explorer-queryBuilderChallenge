const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/appError")
const knex = require("../database/knex")

class usersController {
  async create(request, response) {
    const { name, email } = request.body
    const password = await hash(request.body.password, 8)

    let userExist = await knex("users").where({ email }).first()
    
    if(userExist){
        throw new AppError("Este e-mail já esta em uso")
    }

    await knex("users").insert({
        name,
        password,
        email
    })

    response.status(201).json()
  }
  async index(request, response){
    const {id} = request.params

    const user = await knex("users").select("*").where({id}).first()

    if(!user){
        throw new AppError("Usuário não encontrado")
    }

    response.json(user)
  }
  async show(request, response){
    const users = await knex("users")

    response.json(users)
  }
}

module.exports = usersController
