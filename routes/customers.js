const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

router.get('/', async (res, req) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.get('/id', async (req, res) => {
  const customers = await Customer.findById(req.params.id);

  if (!customers) return res.status(404).send('The customer with the given ID was not found');

  res.send(customers);

});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(200).send(error.detail[0].message);
  
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customer = await customer.save();
  res.send(customer);
});

router.put('/id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(200).send(error.detail[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    }, { new: true });
  
  if (!genre) return res.status(400).send('The customer with the given ID was not found');

  res.send(customer);
});

router.delete('/id', async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) return res.status(400).send('The customer with the given ID was not found');

  res.send(customer);
});

module.exports = router;