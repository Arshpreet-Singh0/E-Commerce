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


const app = express();
//utils
connectDatabase();

const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin : '*',
    credentials : true,
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(urlencoded({extended:true}));
app.use(express.json())

//api's

app.use('/api/v1/user', userRouter);
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);

app.get('/',(req,res)=>{
    res.send('working');
})
app.get('*',(req,res)=>{
    res.json("not found");
})

app.listen(PORT,()=>{
    console.log(`App Listining to port ${PORT}`);
    
})