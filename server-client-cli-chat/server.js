const net = require("net")
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const PORT = 3000

const server = net.createServer()

server.listen(PORT, () => {
    console.log("Listening in %i", PORT)
})

server.on("connection", (socket) => {
    console.log("Client connected")

    socket.write("Welcome!")

    socket.on("data", (data) => {
        // data is binary 
        console.log(data.toString())
    })

    rl.on("line", (input) => {
        socket.write(`SERVER: ${input}`)
    })
})


