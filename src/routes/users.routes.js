const {Router} = require("express")
const UsersController = require('../controllers/usersController')

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.get("/:id", usersController.index)
usersRoutes.get("/", usersController.show)
usersRoutes.put("/:id", usersController.update)

module.exports = usersRoutes