const express = require("express")
const routes = require("./routes")
const app = express()

// const sqliteConnection = require("./database/sqlite")
app.use(express.json())
app.use(routes)

app.listen(3333, ()=>console.log('Server is running in port 3333'))