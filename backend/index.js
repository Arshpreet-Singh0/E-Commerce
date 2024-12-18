import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import connectDatabase from './utils/database.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config();

//routes
import userRouter from './routes/auth.route.js'
import categoryRouter  from './routes/category.route.js'
import productRouter from './routes/product.route.js'
import orderRouter from './routes/order.route.js'
import reviewRouter from './routes/review.route.js'
import cartRouter from './routes/cart.route.js'
import paymentRouter from './routes/payment.route.js'


const app = express();
//utils
connectDatabase();

const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: [process.env.APP_URL, 'http://localhost:5173'], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(urlencoded({extended:true}));
app.use(express.json())

//api's

app.use('/api/v1/user', userRouter);
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/payment', paymentRouter);

app.get('/',(req,res)=>{
    res.send('working');
});

//to get razor pay keuy at frontend
app.get('/getkey', (req,res)=>{
    return res.json({key:process.env.RAZORPAY_KEY_ID});
})

app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});
app.use('*',(req,res)=>{
    res.json("not found");
})
app.listen(PORT,()=>{
    console.log(`App Listining to port ${PORT}`);
    
})