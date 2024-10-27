import Cart from "../models/cart.model.js";

export const addProductToCart = async(req, res)=>{
    try {
        const {products} = req.body;
        const user = req.id;

        let cart = await Cart.findOne({user});

        if(!cart){
            const newCart = Cart.create({
                user,
                products
            })
        }
        else{
            cart.products = products;
            
            await cart.save();

        }
        

        cart = await Cart.findOne({user}).populate({
            path : "products"
        });

        res.status(200).json({
            message : "Cart updated successfully",
            success : true,
            cart,
        });
    } catch (error) {
        console.log(error);
    }
}

export const getCart = async(req, res)=>{
    try {
        const user = req.id;
        const cart = await Cart.findOne({user}).populate({
            path : "products",
            populate : {
                path : 'product'
            }
        });

        return res.status(200).json({
            cart,
            success : true,
        })
    } catch (error) {
        console.log(error);
    }
}