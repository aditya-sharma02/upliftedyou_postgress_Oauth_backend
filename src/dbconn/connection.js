// const mongoose = require("mongoose")


// mongoose.connect(process.env.MONGODB_URL, {
// }).then(() => {
//     console.log("coonection eshtablished")
// }).catch((e) => {
//     console.log(e)
// })

// ****************postgrsql********
const { Client } = require('pg')
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "adisha0206",
    database: "upliftedyoudb"
})

module.exports = client