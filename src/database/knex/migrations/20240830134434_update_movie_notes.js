
exports.up = knex => knex.schema.alterTable("movie_notes", table=>{
    table.text("description")
})


exports.down = knex=>knex.schema.dropTable("movie_notes")
