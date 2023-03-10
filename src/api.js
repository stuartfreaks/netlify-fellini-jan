const express =  require('express');

const serverless =  require('serverless-http');


const app = express();

//Mongoose Models 

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

bodyParser = require("body-parser"),
uuid = require("uuid"),
morgan = require("morgan")

const router = express.Router();


router.get('/', (req, res) => {

  res.json({
      'hello' : 'hi!'
  });

});

router.get('/test', (req, res) => {

    res.json({
        'Test' : 'Test!'
    });
  
  });

app.use('/.netlify/functions/api', router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports.handler = serverless(app);

// get all movies

router.get(
    '/movies', (req, res) =>
    Movies.find()
      .then((movies) => {
        res.status(200).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      })
)

// get all Users
router.get(
    '/users', (req, res) =>
    res.json({
        'Users' : "These Users"
    })
)

// get movies by titles

router.get(
    '/movies/:Title', (req, res) =>
    res.json({
        'Movies' : "This Title"
    })
)

//get genre by name

router.get(
    '/movies/genres/:Name', (req, res) =>
    res.json({
        'Genres' : "This Genre"
    })
)

//get director by name

router.get(
    '/movies/directors/:Name', (req, res) =>
    res.json({
        'Directors' : "Director Name"
    })
)

//add user

router.post(
    '/users', (req, res) =>
    res.json({
        'Users' : "Add User"
    })
)

// allow users to update their info

router.put(
    '/users/:Username', (req, res) =>
    res.json({
        'Users' : "Update Name"
    })
)