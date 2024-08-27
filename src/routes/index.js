const Router = require("express")

const usersRoutes = require("../routes/users.routes")

const route = Router()

route.use("/users", usersRoutes)

module.exports = route