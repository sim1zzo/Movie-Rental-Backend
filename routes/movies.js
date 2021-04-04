const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send('The movie with the given ID was not found');

  res.send(movie);
});

router.post('/',async (req, res)=> {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.detail[0].message);

  const genre = await Genre.findById(req.params.genreId);
  if (!genre) return res.status(400).send("Invalid genre");
  
  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await movie.save();

  res.status(200).send(movie);
});

router.put('/id', async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.params.id);
  const update = {
    title: movie.title,
    genre: movie.genre,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  }
  await movie.updateOne(update);
});

router.delete('/:id',[auth,admin], async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!customer) return res.status(400).send('The customer with the given ID was not found')
  
  res.send(customer);
});

module.exports = router;