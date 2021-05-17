const mongoose = require("mongoose");

const utilisateurSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
