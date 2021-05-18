//---------------------- Controllers = stock la logique métier

const Sauce = require("../models/Sauce");
const Utilisateur = require('../models/Utilisateur');
const fs = require('fs');

//---------------------- Middleware : Ajouter une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject.id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

//---------------------- Middleware : Ajouter un like ou dislike à une sauce
exports.createSauceLike = (req, res, next) => {
  Utilisateur.findOne({ userId: req.body.userId })
    .then(like => {
      const sauceObject = JSON.parse(req.body.sauce);
      if (like = 1) {
        sauceObject.usersLiked.push(userId);
        res.status(200).json({ message: 'Like enregistré !'})
      } else if (like = 0) {
        sauceObject.usersLiked.pop(userId);
        sauceObject.usersDisliked.pop(userId);
        res.status(200).json({ message: 'Like ou Dislike annulé !' })
      } else if (like = -1) {
        sauceObject.usersDisliked.push(userId);
        res.status(200).json({ message: 'Dislike enregistré !' })
      }
    })
    .catch(error => res.status(500).json({ error }));
};

//---------------------- Middleware : Modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

//---------------------- Middleware : Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//---------------------- Middleware : Récupèrer une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//---------------------- Middleware : Récupèrer toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(401).json({ error }));
};
