import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  price: {
    type: Number,
    required: true,
    maxlength: 32,
    trim: true,
    min : 1,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min : 0,
  },
  sold: {
    type: Number,
    default: 0,
    min : 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
      },
    },{_id:false},
  ],
  brand: {
    type: String,
    required: true,
    maxlength: 50,
  },
},{ timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product