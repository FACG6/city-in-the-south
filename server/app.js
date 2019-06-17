const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cookie = require('cookie-parser');
const { join } = require('path');

const router = require('./routes');

// Notifications
io.on('connection', (socket) => {
  console.log('new client is connected');
  socket.emit('message', 'Welcome client');
});
//

app.use(express.json());

app.use(cookie());

app.use('/api/v1', router);

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = http;
