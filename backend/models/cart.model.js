import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    name : { 
      type: String, 
      required: true 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price : {
      type : Number,
      required : true
    },
    image : {
      type: String,
      required : true
    },
  },
  { timestamps: true }
);


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
