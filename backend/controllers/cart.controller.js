import Cart from "../models/cart.model.js";

export const addProductToCart = async(req, res)=>{
    try {
        const {product, quantity} = req.body;
        
        const user = req.id;

        let cart = await Cart.findOne({user});

        if(!cart){
            const newCart = Cart.create({
                user,
                products : [{
                    product,
                    quantity
                }],
            })
        }
        else{
            cart.products.push({
                product,
                quantity
            });            
            
            await cart.save();

        }
        

        cart = await Cart.findOne({user}).populate({
            path : "products",
            populate : {
                path : 'product'
            }
        });

        res.status(200).json({
            message : "Cart updated successfully",
            success : true,
            cart,
        });
    } catch (error) {
        next(error);   
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
        next(error);   
    }
}

export const removeProductFromCart = async(req, res, next)=>{
    try {
        const {productid} = req.params;
        const user = req.id;

        const cart = await Cart.findOneAndUpdate({user},{$pull : {products: { product: productid }}},{new : true}).populate({
            path : "products",
            populate : {
                path : 'product'
            }
        });;

        return res.status(200).json({
            message : "Product removed from cart successfully",
            success : true,
            cart,
        })
    } catch (error) {
        next(error);        
    }
}