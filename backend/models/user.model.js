import mongoose, {Schema} from "mongoose";

export const addressSchema = new mongoose.Schema({
    name : {
      type: String,  
      required: true
    },
    phone : {
      type: String,
      required: true,
    },
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
    },
    landmark : {
      type: String,
    },
    addresstype : {
      type: String,
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
    address : {
      type : addressSchema
    },
    role : {
      type : String,
      enum : ['user','admin','superadmin'],
    }
},{ timestamps: true })

const User = mongoose.model('User', userSchema);

export default User