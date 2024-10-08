const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/appError")
const knex = require("../database/knex")

class usersController {
  async create(request, response) {
    const { name, email } = request.body
    const password = await hash(request.body.password, 8)

    const userExist = await knex("users").where({ email }).first()

    if (userExist) {
      throw new AppError("Este e-mail já esta em uso")
    }

    await knex("users").insert({
      name,
      password,
      email,
    })

    response.status(201).json()
  }
  async index(request, response) {
    const { id } = request.params

    const user = await knex("users").select("*").where({ id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    response.json(user)
  }
  async show(request, response) {
    const users = await knex("users")

    response.json(users)
  }
  async update(request, response) {
    const { id } = request.params
    const { name, email, password, old_password } = request.body

    const userExists = await knex("users").where({ id }).first()
    if (!userExists) {
      throw new AppError("Usuário não encontrado")
    }

    const emailAlreadyExist = await knex("users").where({ email }).first()
    if (emailAlreadyExist && emailAlreadyExist.id != userExists.id) {
      throw new AppError("Email informado já esta cadastrado")
    }

    userExists.name = name || userExists.name
    userExists.email = email || userExists.email

    const oldPasswordIsNotEmpty = !old_password
    if (password && oldPasswordIsNotEmpty) {
      throw new AppError("Por favor informe senha antiga")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, userExists.password)
      if (!checkOldPassword) {
        throw new AppError("Senha antiga esta incorreta")
      }

      userExists.password = await hash(password, 8)
    }

    await knex("users").update(userExists).where({ id })

    return response.json({ status: "modificado" })
  }
  async delete(request,response){
    const {id} = request.params

    const userExist = await knex("users").where({id}).first()
    if (!userExist) {
      throw new AppError("Usuário não encontrado")
    }

    await knex("users").where({id}).delete()
  }
}

module.exports = usersController
