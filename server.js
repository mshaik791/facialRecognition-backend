const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const knex = require('knex');
const app = express();


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
app.use(bodyParser.json());
app.use(cors());



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    //port : 3306,
    user : 'hameed',
    password : '',
    database : 'smartbrain'
  }
});



app.get('/', (req, res)=> {

	res.send('success');

});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req,res, db, bcrypt)}); //dependency injections


app.put('/image', (req, res) => {image.handleImage(req, res, db)})





app.listen(3000, () =>  {

	console.log('app is running on port 3000')
});

