const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 5,
    maxlenght: 50
  }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    genre: Joi.string().min(4).required()
  });
  return schema.validate(genre);
};

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;