const Router = require("express")

const usersRoutes = require("../routes/users.routes")
const moviesNotesRoutes = require("./moviesNotes.routes")

const route = Router()

route.use("/users", usersRoutes)
route.use("/moviesNotes", moviesNotesRoutes)

module.exports = route