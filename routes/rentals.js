const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.status(200).send(rentals);
});

router.get('/id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(400).send('The rental with the given ID was not found');

  re.send(rental);
});

//Create new rental
router.post('/', async (req, res) => {
  //Validate the request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.detail[0].message);

  // Checking customer id 
  const customer = await Customer.findById(req.params.id);
  if (!rental) return res.status(400).send('The customer with the given ID was not found');
  
  // Checking for movie id
  
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send('Invalid movie');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    }
  });

  // we need to make sure that both saves are executed
  // for this reason i have use fawn for a two phase transaction.

  // rental = await rental.save();
  // movie.numberInStock--;
  // await movie.save();
  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: movie._id }, {
        $inc: { numberInStock: -1 }
      })
      .run();
    res.send(rental);
  } catch (error){
    res.status(500).send('Something failed ', error.message);
  }
});

module.exports = router;
