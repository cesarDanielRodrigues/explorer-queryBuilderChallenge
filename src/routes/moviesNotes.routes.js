const {Router} = require("express")
const MoviesNotesController = require("../controllers/moviesNotesController")

const moviesNotesRoutes = Router()
const moviesNotesController = new MoviesNotesController()

moviesNotesRoutes.post("/", moviesNotesController.create)
moviesNotesRoutes.get("/:user_id", moviesNotesController.index)
moviesNotesRoutes.get("/", moviesNotesController.show)
moviesNotesRoutes.delete("/:id", moviesNotesController.delete)

module.exports = moviesNotesRoutes