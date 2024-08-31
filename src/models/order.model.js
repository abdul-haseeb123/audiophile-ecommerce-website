import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  billingDetails: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    enum: ["e-money", "cash-on-delivery"],
    required: true,
  },
  orderValue: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  items: {
    type: [itemSchema],
    required: true,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
