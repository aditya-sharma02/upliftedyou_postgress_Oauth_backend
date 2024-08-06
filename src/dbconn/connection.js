const { Client } = require('pg')
console.log(process.env.password)
const client = new Client({
    host: process.env.host,
    user: process.env.user,
    port: process.env.port,
    password: process.env.PASSWORD,
    database: process.env.database,
})

module.exports = client