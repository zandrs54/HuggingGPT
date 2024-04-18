const express = require('express')
const path = require('path')
const {createServer} = require('http')
const {Server} = require('socket.io')

const app = express()
const server = createServer(app)
const io = new Server(server)

const chatSocket = require('./chatSocket')

const PORT = process.env.PORT || 3000

app.use(express.static('src'))
chatSocket(io)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'src', 'index.html'))
})

server.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`)

})
