const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cartItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      qty: { type: Number, required: true }
    }
  ],
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
