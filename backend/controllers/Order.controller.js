import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const createOrder = async(req, res, next)=>{
    try {
        const user = req.id;
        const {product, name, taxprice,shippingAddress, shippingPrice,totalPrice, quantity} = req.body;
        

        if(!product || !name || !shippingAddress || !totalPrice || !quantity){
            return res.status(400).json({
                message: "Please fill all the fields",
                success : false,
            });
        }

        const prod = await Product.findById(product);
        console.log(prod);
        

        if(!prod){
            return res.status(400).json({
                message: "Selected Product does not exist",
                success : false,
            });
        }
        


        const order = await Order.create({
            user,
            product,
            name,
            admin : prod.created_by,
            shippingAddress,
            quantity,
            taxprice,
            shippingPrice,
            totalPrice,
        })

        console.log(order);
        
        prod.stock = prod.stock-quantity;

        await prod.save();

        return res.status(200).json({
            message: "Order created successfully",
            success : true,
        })
    } catch (error) {
        next(error);
    }
}

export const getOrders = async(req, res, next)=>{
    try {
        const user = req.id;
        const orders = await Order.find({user}).populate('product')

        return res.status(200).json({
            orders,
            success : true,
        });
    } catch (error) {
        next(error);
    }
}

export const updateOrder = async(req,res, next)=>{
    try {
        const {status, isPaid} = req.body;
        
        
        const order = await Order.findById(req.params.id);
        console.log(order);
        
        if(!order){
            return res.status(404).json({
                message : "Order not found",
                success : false,
            })
        }

        if(isPaid!=null) order.isPaid = isPaid;
        if(status) order.status = status;

        await order.save();

        return res.status(200).json({
            message : 'Order updated successfully',
            success : true,
        })

    } catch (error) {
        next(error);
    }
}