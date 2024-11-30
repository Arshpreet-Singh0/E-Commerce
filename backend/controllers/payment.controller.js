import Order from "../models/order.model.js";
import { instance } from "../utils/razorpayInstance.js";
import crypto from "crypto";

export const checkOut = async (req, res, next) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
      receipt: `receipt+${Date.now()}`,
    };
    const order = await instance.orders.create(options);
    res.json({
      order,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const paymentVerification = async (req, res, next) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex')
    // console.log(expectedSignature);
    // console.log(razorpay_signature);

    const isMatch = expectedSignature===razorpay_signature;
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
    
    const order = await Order.findOneAndUpdate(
      { orderid: razorpay_order_id }, // Match with Razorpay order ID
      {
        paymentstatus: "confirmed",
        paymentid: razorpay_payment_id,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.redirect(`${process.env.APP_URL}/payment-success?key=${razorpay_payment_id}`)
  } catch (error) {
    console.log(error);
    next(error);
  }
};
