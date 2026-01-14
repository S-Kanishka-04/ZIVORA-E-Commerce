const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,

  ratings: {
    type: Number,
    default: 0
  },

  images: [
    {
      url: {
        type: String,
        required: true
      }
    }
  ],

  category: String,
  seller: String,

  stock: {
    type: Number,
    default: 0
  },

  numOfReviews: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
