const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const sauceRoutes = require('./routes/sauces')

//---------------------- Connection à Mongoose
mongoose
  .connect(
    "mongodb+srv://Flo:0cqtyX8MHbpwlMqA@cluster0.3wkp8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

//---------------------- Middleware général : Ajout de header pour permettre à l'app d'accèder à l'API _ CORS = sécurité
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//---------------------- Middleware général : Transforme corps de la requête en obj JS utilisable
app.use(bodyParser.json());

app.use('/api/sauces', sauceRoutes);


module.exports = app;