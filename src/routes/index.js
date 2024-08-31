const Router = require("express")

const usersRoutes = require("../routes/users.routes")
const moviesNotesRoutes = require("./moviesNotes.routes")
const tagsRoutes = require("./tags.routes")

const route = Router()

route.use("/users", usersRoutes)
route.use("/moviesNotes", moviesNotesRoutes)
route.use("/tags", tagsRoutes)

module.exports = route