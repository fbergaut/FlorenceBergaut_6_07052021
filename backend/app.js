const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
const dotenv = require('dotenv').config();

const sauceRoutes = require('./routes/sauces');
const utilisateurRoutes = require('./routes/utilisateurs');

//---------------------- Connection à Mongoose
mongoose
  .connect(process.env.DB_CONNEXION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//---------------------- Création de l'application Express
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

//---------------------- Middleware général : Indique le dossier dans lequel les images vont être stockées
app.use('/images', express.static(path.join(__dirname, 'images')));

//---------------------- Middleware général : Utilise les routes définies dans le fichier routes/sauces.js
app.use('/api/sauces', sauceRoutes);
app.use("/api/auth", utilisateurRoutes);

//---------------------- On exporte l'application pour y accèder depuis les autres fichiers
module.exports = app;