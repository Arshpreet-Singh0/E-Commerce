import Cart from "../models/cart.model";

export const addProductToCart = async(req, res)=>{
    try {
        const {products} = req.body;
        const user = req.id;

        const cart = await Cart.findOne({user});

        if(!cart){
            const newCart = Cart.create({
                user,
                products
            })

            return res.status(200).json({
                message: "Product added to cart successfully",
                cart : newCart,
                success : true,
            })
        }
        
        cart.products = products;

        await cart.save();

        res.status(200).json({
            message : "Cart updated successfully",
            success : true,
            cart,
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateCart = async(req, res)=>{
    try {
        const {products} = req.body;
        const user = req.id;
        
        const res = await Cart.findOneAndUpdate({user},{products});

        res.status(200).json({
            message : "Cart updated successfully",
            success : true,
        });
    } catch (error) {
        console.log(error);
    }
}