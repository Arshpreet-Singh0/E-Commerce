import mongoose, { connect } from "mongoose";

const connectDatabase = async()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to db');
    })
    .catch((err)=>{
        console.log(err);
        
    })
}

export default connectDatabase