import express from 'express';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import chat from "./routes/chatRoutes.js";
import errorHandleMiddleware  from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv'
import cors from 'cors';
const app=express();
app.use(cors({origin:["http://localhost:5173","https://ecomm-second.vercel.app"],methods:["POST","GET","PUT","DELETE"],credentials: true}));
// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));
app.use(express.urlencoded({ extended: true }));


// Route
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)
app.use("/api/chat",chat)


app.use(errorHandleMiddleware)
dotenv.config({path:'config/config.env'})
export default app;