const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

// Create Order - /api/v1/order
exports.createOrder = async (req, res, next) => {
  try {
    const cartItems = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Calculate total amount
    const amount = Number(
      cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
    ).toFixed(2);

    const order = await orderModel.create({ cartItems, amount });

    // Update product stock
    for (const item of cartItems) {
      const product = await productModel.findById(item.product._id);
      if (!product) continue;

      product.stock = product.stock - item.qty;
      await product.save();
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
