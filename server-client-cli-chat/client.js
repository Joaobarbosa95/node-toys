const net = require("net")
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const PORT = 3000

const client = net.createConnection(PORT)

client.on("connect", () => {
    console.log("connected")
})

client.on("data", (data) => {
    console.log(data.toString())
})

rl.on("line", (input) => {
    client.write(`CLIENT: ${input}`, )
})


