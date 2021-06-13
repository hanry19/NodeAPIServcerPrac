import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import testRouter from './router/testRouter.js';


const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));


app.use('/test', testRouter);


app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});




app.listen(8080);