const {Router} = require("express")
const MoviesNotesController = require("../controllers/moviesNotesController")

const moviesNotesRoutes = Router()
const moviesNotesController = new MoviesNotesController()

moviesNotesRoutes.post("/", moviesNotesController.create)

module.exports = moviesNotesRoutes