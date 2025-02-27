const dgram = require("dgram")

const PORT = 1337

const server = dgram.createSocket("udp4")

server.on("error", (error) => {
    console.error(`server error:\n${error.stack}`)
    server.close()
})

server.on("message", (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    const response = Buffer.from("Message received")

    server.send(response, rinfo.port, rinfo.address, (err) => {
        if(err) {
            console.error("Failed to send response")
        } else {
            console.log("Response was sucessful")
        }
    })
})

server.on("listening", () => {
    const address = server.address()
    console.log("Listening on port %i", address.port)
})

server.bind(PORT)


