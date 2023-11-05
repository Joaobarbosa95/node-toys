const net = require("net")

const PORT = 1337 

const clientsConnected = []

class Client {
    constructor(socket) {
        // connection timestamp will be used to generate unique id's
        socket.id = new Date().getTime() 
        this.socket = socket
    }

    connect() {
        clientsConnected.push(this)
    }

    disconnect() {
        const clientIndex = clientsConnected.findIndex((client) => {
            return client.socket.id === this.socket.id
        })

        if(clientIndex < 0) throw new Error("Ghost user found")

        clientsConnected.splice(clientIndex, 1)
    }
}

const server = net.createServer()

function writeToAll(message) {
    clientsConnected.forEach((client) => {
        client.socket.write(message)
    }) 
}

server.on("connection", (socket) => {
    const client = new Client(socket)

    client.connect()

    client.socket.write("You are connected")

    socket.on("data", (data) => {
        console.log(data.toString())
        writeToAll(data.toString())
    })

    socket.on("close", (a) => {
        console.log(a)
    })
})

server.listen(PORT, () => {
    console.log("Server listening on port %i", PORT)
})


