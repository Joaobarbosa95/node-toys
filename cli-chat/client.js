const net = require("net")
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const PORT = 1337

async function setUsername() {
    return new Promise((resolve, _) => {
        rl.setPrompt("Insert username:\n")
        // needs to be called to setPrompt be written to output
        rl.prompt()
        rl.getPrompt()

        rl.on("line", (name) => {
            resolve(name)
        })
    }) 
}

(async () => {
    const username = await setUsername()
    console.log(`Your not street name is: ${username}`)
    createClient(username)
})()


function createClient(username) {
    const client = net.connect(PORT, () => {
        client.write(`${username} joined the chat`)
        rl.getPrompt()
        rl.on("line", (message) => {
            if(message.length < 1) return
            client.write(`${username}: ${message}`)
            readline.moveCursor(process.stdout,0,-1);
            readline.clearLine(process.stdout, 0);
        })

        client.on("data", (data) => {
            console.log(data.toString())
        })
    })
}
