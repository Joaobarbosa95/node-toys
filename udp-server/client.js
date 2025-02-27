const dgram = require("dgram")

const PORT = 1337
const HOST = "localhost"

const client = dgram.createSocket("udp4")

client.on("message", (msg, info) => {
    console.log("Address: ", info.address)
    console.log("Port: ", info.port)
    console.log("Size: ", info.size)

    console.log("Message: ", msg.toString())
})

const msg = Buffer.from("This is a message")

client.send(msg, PORT, HOST, (err) => {
    if(err) {
        console.error("Error in packet")
    } else {
        console.log("Packet sent")
    }
})
