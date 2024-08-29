
const error = require("./utils/error")
const express = require("express")
const routes = require("./routes")
const app = express()

app.use(express.json())
app.use(routes)

app.use(error)

app.listen(3333, () => console.log("Server is running in port 3333"))
