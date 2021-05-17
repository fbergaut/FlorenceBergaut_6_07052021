const express = require('express');
const router = express.Router();

const Sauce = require("../models/Sauce");

//---------------------- Middleware : route POST = ajoute une sauce
router.post('/', (req, res, next) => {
    delete req.body.id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

//---------------------- Middleware : route PUT = modifie une sauce
router.put("/:id", (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
});

//---------------------- Middleware : route DELETE = supprime une sauce
router.delete("/:id", (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
});

//---------------------- Middleware : route GET = récupère une sauce
router.get('/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => res.status(200).json(sauce))
      .catch((error) => res.status(404).json({ error }));
});

//---------------------- Middleware : route GET = récupère toutes les sauces
router.get('/', (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(401).json({ error }));
});

module.exports = router;
