const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");

const Utilisateur = require("../models/Utilisateur");

const schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

exports.signup = (req, res, next) => {
  if (schema.validate(req.body.password) === true) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const utilisateur = new Utilisateur({
            email: req.body.email,
            password: hash,
          });
          utilisateur
            .save()
            .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
  } else {
    return res.status(401).json({ error: "Votre mot de passe doit contenir au moins 8 charactères, au moins une majuscule, au moins 2 chiffres et ne pas comporter d'espace !" });
  }
};

exports.login = (req, res, next) => {
  Utilisateur.findOne({ email: req.body.email })
    .then((utilisateur) => {
      if (!utilisateur) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, utilisateur.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: utilisateur._id,
            token: jwt.sign({ userId: utilisateur._id }, process.env.TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
