import mongoose, {Schema} from "mongoose";

export const addressSchema = new mongoose.Schema({
    street: { 
      type: String, 
      required: true, 
      trim: true 
    },
    city: { 
      type: String, 
      required: true, 
      trim: true 
    },
    state: { 
      type: String, 
      required: true 
    },
    pincode: { 
      type: String, 
      required: true, 
      trim: true 
    },
    country: { 
      type: String, 
      required: true, 
      trim: true 
    }
  }, { _id: false });

const userSchema = Schema({
    name: {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    phone : {
        type : Number,
    },
    address : [addressSchema],
    role : {
      type : String,
      enum : ['admin','superadmin'],
    }
},{ timestamps: true })

const User = mongoose.model('User', userSchema);

export default User