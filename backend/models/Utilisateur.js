const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const utilisateurSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6, maxLength: 25 },
});

//------------------------------Utilisation du package mongoose-unique-validator pour empêcher l'utilisation d'une même adresse email à plusieurs reprise
utilisateurSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
