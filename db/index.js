const { Client } = require("pg");
const dbConfig = require("./config")

const client = new Client(dbConfig);

client.connect().then(() => {
    console.log("Client connected on port 5432")
})

module.exports = client;