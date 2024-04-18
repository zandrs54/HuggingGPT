const { G4F } = require('g4f');

const chatSockConnection = (io) => {
    io.of('/').on('connection', (socket) => {
        console.log("User connected");
        var messages = [{ role: "system", content: "Ты эксперт в области психологии"}];
        socket.on('message', (msg) => {
            const g4f = new G4F();
            console.log('Пришло сообщение: ' + msg);
            messages.push({ role: "user", content: msg });
            g4f.chatCompletion(messages).then(
                (result) => {
                    console.log(result);
                    socket.emit('message', result.replace(/\n/g, '<br/>'));
                }

            );
        });
        socket.on('clearChat', () => {
            messages = [{ role: "system", content: "Ты эксперт в области психологии"}];
        })
    });
}

module.exports = chatSockConnection;