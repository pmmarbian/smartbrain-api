const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send('success');
});

app.post("/signin", (req, res) => signin.handleSignIn(db, bcrypt)(req, res));

app.post("/register", (req, res) => register.handleRegister(db, bcrypt)(req, res) );

app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res));

app.put("/image", (req, res) => image.handleImage(db)(req, res));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
