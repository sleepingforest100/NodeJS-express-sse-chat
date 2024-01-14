const express = require('express');
const http = require('http');
const path = require('path');
const { EventEmitter } = require('events');

const app = express();
const server = http.createServer(app);
const eventEmitter = new EventEmitter();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, resp) => {
    resp.send('hi');
});

app.get('/json', (req, resp) => {
    resp.json({ text: 'hi', numbers: [1, 2, 3] });
});

app.get('/echo', (req, resp) => {
    const input = req.query.input || '';
    resp.json({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input.split('').reverse().join('')
    });
});

// app.use('/static', express.static(path.join(__dirname, 'MyChat app')));

app.get('/chat', (req, resp) => {
    const message = req.query.message || '';
    eventEmitter.emit('message', message);
    resp.send('Message sent to chat');
});

app.get('/sse', (req, resp) => {
    resp.setHeader('Content-Type', 'text/event-stream');
    resp.setHeader('Cache-Control', 'no-cache');
    resp.setHeader('Connection', 'keep-alive');

    const sendMessage = (event, data) => {
        resp.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    };

    const messageHandler = (message) => {
        sendMessage('message', message);
    };

    eventEmitter.on('message', messageHandler);

    req.on('close', () => {
        eventEmitter.off('message', messageHandler);
    });
});

app.get('/chat.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat.html'));
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});