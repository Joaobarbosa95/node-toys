const net = require("net")

const PORT = 3000

const server = net.createServer()

server.listen(PORT, () => {
    console.log("Server listening on port %i", PORT)
    console.log(server.address())
})

server.on("error", (e) => {
    switch(e.code) {
        case "ERR_SERVER_ALREADY_LISTEN":
            console.log("Server already running on port %i", PORT)
            break

        case "EADDRINUSE":
            console.log("Port %i already in use", PORT)
            break
    }
})

const response = `HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
Accept-Ranges: bytes
Content-Length: 68 
Content-Type: text/html

<!DOCTYPE html>
<html>
<head></head>
<body><h1>HELLO</h1></body>
</html>
`

server.on("connection", (socket) => {
    console.log("Connected")
    console.log(socket.address())
    console.log(socket.remoteAddress, " ", socket.remotePort)
    //socket.write("HELLO")

    socket.on("data", (data) => {
        socket.write(response)
        console.log(data.toString())
    })

})
