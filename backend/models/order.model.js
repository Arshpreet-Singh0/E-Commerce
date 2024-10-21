import mongoose, { Schema, Types } from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true 
    },
      quantity: {
        type: Number, 
        required: true 
    },
      price: { 
        type: Number, 
        required: true 
    },
      image: { 
        type: String, 
        required: true 
    },
    },
  ],
});
