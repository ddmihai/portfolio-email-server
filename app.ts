import express, { Application } from "express";
const app: Application = express();
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import emailRouter from "./src/routes/emails.routes";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3333'
}));


// Use rate limit to minimise the number of the requests
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});



// Home page
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/email', apiLimiter);
app.use('/email', emailRouter);








// 404 route
app.use((req, res, next) => res.status(404).send('Not Found'));

// Error handler route
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal Server Error');
});


export default app;