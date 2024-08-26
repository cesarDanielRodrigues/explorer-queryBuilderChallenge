const Router = require("express")

const routes = Router()

routes.use("/users", ()=>console.log("teste"))

module.exports = routes