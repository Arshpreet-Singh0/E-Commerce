import mongoose, { Schema, Types } from "mongoose";
import { addressSchema } from "./user.model.js";

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
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  shippingAddress: {
    type : addressSchema,
    required : true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "dispatched", "delivered", "Cancelled"],
    default: "pending",
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  paymentid : {
    type : String,
  },
  paymentstatus : {
    type: String,
    enum: ["pending", "confirmed"],
    default: "pending",
  },
  orderid: {
    type: String,
  }
},{timestamps : true});

const Order = new mongoose.model("Order", orderSchema);

export default Order;
