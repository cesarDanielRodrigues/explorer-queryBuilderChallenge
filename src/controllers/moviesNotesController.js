const AppError = require("../utils/appError")
const knex = require("../database/knex")

class MoviesNotesController {
  async create(request, response) {
    const { id } = request.query
    const { title, description, rating, tags } = request.body

    if (typeof rating != "number") {
      throw new AppError("Por favor insira um valor numérico no rating")
    }
    if (rating <= 0 || rating > 5) {
        throw new AppError("Insira números de 1 a 5 no rating")
    }

    const [note_id] = await knex("movie_notes").insert({
        title,
        description, 
        rating,
        user_id:id
    })

    const tagsInsert = tags.map(name=>{
        return {
            note_id,
            user_id: id,
            name
        }
    })

    await knex("movie_tags").insert(tagsInsert)
    
    return response.status(201).json()
  }
}

module.exports = MoviesNotesController
