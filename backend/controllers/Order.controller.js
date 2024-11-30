import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const createOrder = async(req, res, next)=>{
    try {
        const user = req.id;
        const {product, name, shippingAddress, totalPrice, quantity, orderid} = req.body;
        // console.log(product, name, shippingAddress, totalPrice, quantity, orderid);
        
        

        if(!product || !name || !shippingAddress || !totalPrice || !quantity || !orderid){
            return res.status(400).json({
                message: "Please fill all the fields",
                success : false,
            });
        }

        const prod = await Product.findById(product);
        // console.log(prod);
        

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
            orderid,
            admin : prod.created_by,
            shippingAddress,
            quantity,
            totalPrice,
        })

        // console.log(order);
        
        // prod.stock = prod.stock-quantity;

        // await prod.save();

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
        const orders = await Order.find({user}).populate('product').sort({ createdAt: -1 });

        return res.status(200).json({
            orders,
            success : true,
        });
    } catch (error) {
        next(error);
    }
}
export const getAdminOrders = async(req, res, next)=>{
    try {
        const user = req.id;
        const orders = await Order.find({admin:user}).populate('product').sort({ createdAt: -1 });;

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
        const {status, trackingNumber, courierService} = req.body;
        
        const admin = req.id;
        
        const order = await Order.findOne({_id:req.params.id,admin});
        
        if(!order){
            return res.status(404).json({
                message : "Order not found",
                success : false,
            })
        }

        if(status) order.status = status;
        if(trackingNumber) order.trackingNumber = trackingNumber;
        if(courierService) order.courierService = courierService;

        await order.save();

        return res.status(200).json({
            message : 'Order updated successfully',
            success : true,
        })

    } catch (error) {
        next(error);
    }
}