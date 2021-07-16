const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 80;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API ROUTES

app.get('/', (req, res, next) => {
  res.json({ message: 'Hey! This is your server response!' });
  next();
});

// END API ROUTES
app.set('port', PORT);
const server = http.createServer(app);
server.on('listening', () => {
  console.log('Listening on ' + PORT);
});

server.listen(PORT);

const io = socketIO(server);

// SOCKET IO
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});