require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const sgMail = require('@sendgrid/mail');
const uniqid = require('uniqid');
const User = require("./db/userModel");
const moment = require('moment');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const PORT = process.env.PORT || 80;

const app = express();
const dbConnect = require("./db/dbConnect");
dbConnect();

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

app.post('/login', (req, res) => {
  const code = uniqid();
  const email = req.body.email;
  const msg = {
    to: email,
    from: 'jc.campbellg@gmail.com',
    subject: 'Bienvenido a EBC Virtual',
    text: `Codigo de entrar: ${code}`,
  };
  const userData = {
    email: email,
    code: {
      time: code,
      expire: moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
    }
  };

  User.findOneAndUpdate({email: email}, userData, {
    new: true,
    upsert: true,
    runValidators: true
  }, (error) => {
    if (error) {
      res.status(500).send({
        message: 'Error with user',
        error
      });
    } else {
      sgMail.send(msg).then(() => {
        res.json({ message: "Email Sent" });
      }).catch(error => {
        res.status(500).send({
          message: 'Error with email',
          error
        });
      });
    }
  });
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