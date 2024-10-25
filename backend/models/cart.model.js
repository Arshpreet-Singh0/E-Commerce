import mongoose from "mongoose"

const cartSchems =  new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    products : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
        },
        quantity : {
            type : Number,
            default : 1,
        }
    }],
},{timestamps:true});

const Cart = mongoose.model('Cart',cartSchems);

export default Cart;