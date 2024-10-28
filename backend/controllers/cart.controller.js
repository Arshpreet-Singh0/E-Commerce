import Cart from "../models/cart.model.js";
import Product from '../models/product.model.js'

export const addProductToCart = async(req, res, next)=>{
    try {
        const {productid, quantity} = req.body;
        
        const user = req.id;
        const product = await Product.findOne({_id : productid});
        

        const cart = await Cart.create({
            user,
            product : productid,
            name : product.name,
            quantity,
            price : (quantity*product.price),
            image : product.images[0].url,
        })

        return res.status(200).json({
            message : "Product added to cart",
            success : true,
        })
    } catch (error) {
        next(error);   
    }
}

export const getCart = async(req, res, next)=>{
    try {
        const user = req.id;
        const cart = await Cart.find({user});

        return res.status(200).json({
            cart,
            success : true,
        })
    } catch (error) {
        next(error);   
    }
}

export const removeProductFromCart = async(req, res, next)=>{
    try {
        const {productid} = req.params;
        const user = req.id;

        await Cart.findOneAndDelete({user, product : productid});
        const cart = await Cart.find({user});

        return res.status(200).json({
            message : "Product removed from cart",
            success : true,
            cart
        })
    } catch (error) {
        next(error);        
    }
}

export const updateQuantity = async(req, res, next)=>{
    try {
        const {productid} = req.params;
        const user =  req.id;
        const {quantity} = req.body;
        const product = await Product.findOne({_id : productid});

        await Cart.findOneAndUpdate({user, product : productid}, {quantity, price : (product.price*quantity)});
        const cart = await Cart.find({user});

        return res.status(200).json({
            message : "Quantity updated",
            success : true,
            cart
        })
    } catch (error) {
        next(error);
    }
}