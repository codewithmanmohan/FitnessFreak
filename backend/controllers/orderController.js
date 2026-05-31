import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, city, state, pincode, paymentMethod } = req.body;

    if (!items || items.length === 0 || !totalAmount || !shippingAddress || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      city,
      state,
      pincode,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order || order.userId.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
