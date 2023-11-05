const http = require("http")

const PORT = 3000

function webPage(message) {
    return `
        <!DOCTYPE>
        <html>
            <head></head>
            <body>
                <h1>${message}</h1>
            </body>
        </html>
    `
}

http.createServer((req, res) => {
    switch(req.url.toLowerCase()) {
        case "/":
            res.writeHead(200, { 'Content-Type': 'text/html'})
            res.write(webPage("Initial Page")) 
            break
        case "/about":
            res.writeHead(200, { 'Content-Type': 'text/html'})
            res.write(webPage("About Page")) 
            break
        default:
            res.writeHead(404, { 'Content-Type': 'text/html'})
            res.write(webPage("Page Not Found")) 
    }

    res.end()
}).listen(PORT)

