const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// app.use(express.static(path.join(__dirname, '/public')));


app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.send('hi');
});

app.get('/json', (req, res) => {
  res.json({ text: 'hi', numbers: [1, 2, 3] });
});

app.get('/echo', (req, res) => {
  const input = req.query.input || '';
  const response = {
    normal: input,
    shouty: input.toUpperCase(),
    characterCount: input.length,
    backwards: input.split('').reverse().join(''),
  };
  res.json(response);
});

app.get('/chat', (req, res) => {
  const message = req.query.message || '';
  if (message) {
    server.emit('message', message);
    res.status(200).send('Message sent successfully');
  } else {
    res.status(400).send('Bad Request: Missing message parameter');
  }
});

app.get('/chatpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat.html'));
});

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('data: Welcome to MyChat!\n\n');

  const handleMessage = (message) => {
    res.write(`data: ${message}\n\n`);
  };

  server.on('message', handleMessage);

  req.on('close', () => {
    server.removeListener('message', handleMessage);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});