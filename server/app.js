const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cookie = require('cookie-parser');
const { join } = require('path');

const router = require('./routes');

// Notifications
// const offSocket = io.of('/offer');
// offSocket.on('connection', (socket) => {
//   console.log('special socket');
// });
//

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());

app.use(cookie());

app.use('/api/v1', router);

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = http;
