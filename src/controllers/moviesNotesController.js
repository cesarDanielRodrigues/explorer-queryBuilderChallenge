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
      user_id: id,
    })

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        user_id: id,
        name,
      }
    })

    await knex("movie_tags").insert(tagsInsert)

    return response.status(201).json()
  }
  async index(request, response) {
    const { title, user_id, tag } = request.query

    let note

    if (tag) {
      const filterTag = tag.split(",").map((tag) => tag.trim())
      note = await knex("movie_notes")
        .select(["movie_notes.id", "movie_notes.title", "movie_notes.user_id"])
        .where("movie_notes.user_id",user_id)
        .whereLike("movie_notes.title", `%${title}`)
        .whereIn("movie_tags.name", filterTag)
        .innerJoin("movie_tags", "movie_tags.note_id", "movie_notes.id")
    } else {
      note = await knex("movie_notes")
      .where({user_id})
      .whereLike("title",`%${title}`)
      .orderBy("title")
    }

    const userTags = await knex("movie_tags").where({user_id})
    const notesWithTags = note.map(note=> {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return{
        ...note,
        tags: noteTags
      }
    })
    return response.status(200).json(notesWithTags)
  }
}

module.exports = MoviesNotesController
